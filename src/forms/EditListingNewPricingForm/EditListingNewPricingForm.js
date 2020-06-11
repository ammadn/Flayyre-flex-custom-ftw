import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput } from '../../components';
import css from './EditListingPricingForm.css';
import FieldCheckbox from '../../components/FieldCheckbox/FieldCheckbox';
import FieldSelect from '../../components/FieldSelect/FieldSelect';
import { OnChange } from 'react-final-form-listeners';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import ImgFaceBook from '../../assets/facebook.png';


const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        add,
        remove,
        directPriceInputArray,
        addOther,
      } = fieldRenderProps;

      const { direct_pricing } = values;
      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
          ? 'EditListingPricingForm.pricePerDay'
          : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        }),
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          },
        ),
        config.listingMinimumPriceSubUnits,
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};


      const element = (item, key) => {


        // console.log('ptypeee', item);
        return (


            <div className={css.selectingCard}><h4><span> <label></label></span></h4>
              <div className={css.txtField}>

                <FieldSelect
                  id={item.promotionType}
                  name={item.promotionType}

                  className={css.selectCountry}
                  label='Select promotion type'
                >
                  <option value="">
                  </option>
                  <option value="Brand Sponsorship">
                    Brand Sponsorship
                  </option>
                  <option value="IG Story">
                    IG Story Promo
                  </option>
                  <option value="IG Post">
                    IG Post Promo
                  </option>
                  <option value="Twitter">
                    Twitter Promo
                  </option>
                  <option value="YT">
                    YT Promo
                  </option>
                  <option value="Others">
                    Others
                  </option>
                </FieldSelect>

                <OnChange name={item.promotionType}>

                  {(value, previous) => {

                    if (value === 'Others') {
                      // console.log('samee samee');
                      {
                        addOther(key, true);
                      }
                    } else {
                      {
                        addOther(key, false);
                      }
                    }
                  }

                  }
                </OnChange>


                {item.other ? <FieldTextInput
                  type="new"
                  id={'other' + item.promotionType}
                  name={'other' + item.promotionType}
                  className={css.priceInput}

                  placeholder='enter promotion type'

                /> : null}

                <FieldCurrencyInput
                  type="new"
                  id={item.str}
                  name={item.str}
                  className={css.priceInput}

                  placeholder='enter price'
                  currencyConfig={config.currencyConfig}
                  validate={priceValidators}
                />
              </div>
            </div>


        );
      };


      // console.log(values);
      const priceCom = (

        directPriceInputArray.map((item, key) =>
     element(item, key)
        )

      );


      const directPrice =
        (direct_pricing && direct_pricing[0]) ?
          (<div><div className={css.rootOfOfferCard}>
              {priceCom}


            </div>
            <button type='button' onClick={add}>add</button>
      <button type='button' onClick={remove}>remove</button>
            </div>
          ) : null;


      // console.log('vaaaaa', fieldRenderProps.values);
      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed"/>
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed"/>
            </p>
          ) : null}

          <div className={css.price_checkbox_group}>  <FieldCheckbox value='true' name="offer_listing" id="offer_listing"/> <label>Offer listing</label></div>

          <div className={css.price_checkbox_group}><FieldCheckbox value='true' name="direct_pricing" id="direct_pricing"/><label>Direct pricing </label></div>
          {
            directPrice
          }
          {/*<FieldCurrencyInput*/}
          {/*  id="price"*/}
          {/*  name="price"*/}
          {/*  className={css.priceInput}*/}
          {/*  autoFocus*/}
          {/*  label={pricePerUnitMessage}*/}
          {/*  placeholder={pricePlaceholderMessage}*/}
          {/*  currencyConfig={config.currencyConfig}*/}
          {/*  validate={priceValidators}*/}
          {/*/>*/}

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = {
  fetchErrors: null,
  direct_pricing: null,
};

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
