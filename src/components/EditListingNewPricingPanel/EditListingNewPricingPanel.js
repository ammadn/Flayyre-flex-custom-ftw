import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureListing, ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.css';
import EditListingNewPricingForm from '../../forms/EditListingNewPricingForm/EditListingNewPricingForm';
import { LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT } from '../../util/urlHelpers';

const { Money } = sdkTypes;

const EditListingNewPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    add,
    remove,
    directPriceInputArray
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );


const addToArray=(values)=> {

    var arr = {};
    if (values) {
      console.log(values);

      Object.keys(values).forEach(function(key) {
        var matchingKey = key.indexOf('price') !== -1;

        if (matchingKey) {
          Object.keys(values).forEach(function(key2) {
            if (key2.indexOf(key.substr(key.length - 4)) !== -1 && key!=key2){
              console.log('this if',key,key2)
              if(arr[key]==null&&arr[key2]==null) {
                arr[key]=[values[key], values[key2]]

              }
            }
          })
        }
      });
      let updateValues = {}

      updateValues.publicData={};
      updateValues.publicData.values=arr;

console.log('values',updateValues);
     return updateValues;

    } else {

    }
  };



  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingNewPricingForm
      directPriceInputArray={directPriceInputArray}
      className={css.form}
      initialValues={{ price }}
      onSubmit={values=>{
        delete values.price;

        const updateValues = {
          publicData: {
            values
          },
        };
        onSubmit(addToArray(values));
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
      add={add}
      remove={remove}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingNewPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingNewPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingNewPricingPanel;
