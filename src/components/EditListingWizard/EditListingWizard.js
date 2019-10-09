import React, { Component } from 'react';
import { array, bool, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { withViewport } from '../../util/contextHelpers';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureCurrentUser, ensureListing } from '../../util/data';
import { PayoutDetailsForm } from '../../forms';
import { FieldCurrencyInput, Footer, Form, LayoutWrapperFooter, Modal, NamedRedirect, Tabs } from '../../components';

import EditListingWizardTab, {
  AVAILABILITY,
  DESCRIPTION,
  FOLLOWERS,
  NEW_PRICING,
  PHOTOS,
  POLICY,
  PRICING,
} from './EditListingWizardTab';
import css from './EditListingWizard.css';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldPhoneNumberInput from '../FieldPhoneNumberInput/FieldPhoneNumberInput';

// Show availability calendar only if environment variable availabilityEnabled is true
const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : [];

// TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
// All the other panels can be reordered.
export const TABS = [
  DESCRIPTION,
  FOLLOWERS,
  POLICY,
  NEW_PRICING,
  PHOTOS,
];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription';
  } else if (tab === POLICY) {
    key = 'EditListingWizard.tabLabelPolicy';
  } else if (tab === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos';
  } else if (tab === FOLLOWERS) {
    key = 'EditListingWizard.tabLabelFollowers';
  } else if (tab === NEW_PRICING) {
    key = 'EditListingWizard.tabLabelNewPrice';
  }

  return intl.formatMessage({ id: key });
};

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing) => {
  const {
    availabilityPlan,
    description,
    title,
    publicData,
    folloers,

  } = listing.attributes;
  const images = listing.images;

  switch (tab) {
    case DESCRIPTION:
      return !!(description && title);
    case POLICY:
      return !!(publicData && typeof publicData.rules !== 'undefined');
    case FOLLOWERS:
      return !!(publicData);
    case NEW_PRICING:
      return !!(publicData);
    case PHOTOS:
      return images && images.length > 0;
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;
    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing) : true;
    return { ...acc, [tab]: isActive };
  }, {});
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
      followers: false,
      IG: false,
      Twitter: false,
      Fb: false,
      Other: false,
      directPriceInputArray: [],
    };
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
    this.handlePublishListing = this.handlePublishListing.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  handlePublishListing(id) {
    const { onPublishListingDraft, currentUser } = this.props;
    const stripeConnected =
      currentUser && currentUser.stripeAccount && !!currentUser.stripeAccount.id;
    if (stripeConnected) {
      onPublishListingDraft(id);
    } else {
      this.setState({
        draftId: id,
        showPayoutDetails: true,
      });
    }
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    this.props
      .onPayoutDetailsSubmit(values)
      .then(() => {
        this.setState({ showPayoutDetails: false });
        this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false);
        this.props.onPublishListingDraft(this.state.draftId);
      })
      .catch(() => {
        // do nothing
      });
  }



  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      listing,
      viewport,
      intl,
      errors,
      fetchInProgress,
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      fieldRenderProps,
      ...rest
    } = this.props;

    const { Money } = sdkTypes;

    const priceRequired = validators.required(
      intl.formatMessage({
        id: 'EditListingPricingForm.priceRequired',
      })
    );
    const priceValidators = config.listingMinimumPriceSubUnits
      ? validators.composeValidators(priceRequired, minPriceRequired)
      : priceRequired;
    const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);

    const minPriceRequired = validators.moneySubUnitAmountAtLeast(
      intl.formatMessage(
        {
          id: 'EditListingPricingForm.priceTooLow',
        },
        {
          minPrice: formatMoney(intl, minPrice),
        }
      ),
      config.listingMinimumPriceSubUnits
    );

    const selectedTab = params.tab;
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type,
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(isNewListingFlow, currentListing);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }}/>;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = tab => {
      return { name: 'EditListingPage', params: { ...params, tab } };
    };

    const changeState = (state, type) => {

      switch (type) {
        case 'IG': {
          this.setState({ IG: !state });
        }
          break;
        case 'Twitter':
          this.setState({ Twitter: !state });
          break;
        case 'Other':
          this.setState({ Other: !state });
          break;
        case 'Fb':
          this.setState({ Fb: !state });
          break;
        case 'followers':
          this.setState({ followers: !this.state.followers });
          break;
      }

    };

    const mustBeNumber =value => (isNaN(value) ? 'Must be a number' : undefined);
    const minValue = min => value =>
      isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
    const composeValidators = (...validators) => value =>
      validators.reduce((error, validator) => error || validator(value), undefined)

    const add = () => {
      let str="price";
      let promotionType="pro_price";
      str=str.concat(this.state.directPriceInputArray.length.toString());
      promotionType=promotionType.concat(this.state.directPriceInputArray.length.toString());
      const element = (

        <div>
          <FieldTextInput
            type="new"
            id={promotionType}
            name={promotionType}
            className={css.priceInput}

            placeholder='enter promotion type'

          />
          <FieldCurrencyInput
            type="new"
          id={str}
          name={str}
          className={css.priceInput}

          placeholder='enter price'
          currencyConfig={config.currencyConfig}
            validate={priceValidators}
        />
        </div>
      );

      this.setState({
        directPriceInputArray: [...this.state.directPriceInputArray, element],
      });


    };

if(fieldRenderProps){

}




    const remove=()=>{
      const directPriceInput = this.state.directPriceInputArray.filter(item => item !== this.state.directPriceInputArray[this.state.directPriceInputArray.length-1]);
      this.setState({ directPriceInputArray: directPriceInput });

    }

    return (
      <div className={classes}>
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map(tab => {
            return (
              <EditListingWizardTab
                followers={this.state.followers}
                IG={this.state.IG}
                Fb={this.state.Fb}
                Twitter={this.state.Twitter}
                Other={this.state.Other}
                changeState={changeState}
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={listing}
                marketplaceTabs={TABS}
                errors={errors}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
                handlePublishListing={this.handlePublishListing}
                fetchInProgress={fetchInProgress}
                add={add}
                remove={remove}
                directPriceInputArray={this.state.directPriceInputArray}
              />
            );
          })}
        </Tabs>
        <Modal
          id="EditListingWizard.payoutModal"
          isOpen={this.state.showPayoutDetails}
          onClose={this.handlePayoutModalClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalPayoutDetailsWrapper}>
            <h1 className={css.modalTitle}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing"/>
              <br/>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitlePayoutPreferences"/>
            </h1>
            <p className={css.modalMessage}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo"/>
            </p>
            <PayoutDetailsForm
              className={css.payoutDetails}
              inProgress={fetchInProgress}
              createStripeAccountError={errors ? errors.createStripeAccountError : null}
              currentUserId={ensureCurrentUser(this.props.currentUser).id}
              onChange={onPayoutDetailsFormChange}
              onSubmit={this.handlePayoutSubmit}
            />
          </div>
        </Modal>
        <LayoutWrapperFooter>
          <Footer/>
        </LayoutWrapperFooter>
      </div>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
  updateInProgress: false,
  fieldRenderProps:null,
};

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
    uploadImageError: object,
    createStripeAccountError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  updateInProgress: bool,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(
  withViewport,
  injectIntl,
)(EditListingWizard);
