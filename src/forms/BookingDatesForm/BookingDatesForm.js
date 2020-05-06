import React, { Component } from 'react';
import { arrayOf, bool, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';

import { END_DATE, START_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { FieldDateRangeInput, FieldPhoneNumberInput, Form, PrimaryButton } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.css';
import { formatCurrencyMajorUnit, formatMoney } from '../../util/currency';
import { OnChange } from 'react-final-form-listeners';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import * as validators from '../../util/validators';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      dates: 7,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.

  addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  handleFormSubmit(e) {
    var dateobj = new Date();
// Contents of above date object is
// converted into a string using toISOString() function.
    console.log('date value',dateobj);
    var dateobj2=dateobj.toISOString()
    var B = dateobj.toISOString();

    console.log('date value',dateobj2);
    var increment=this.state.dates;
    this.props.onSubmit({
      'bookingDates': {
        'startDate': dateobj2,
        'endDate': this.addDays(dateobj,parseInt(increment)).toISOString(),
      },
    });

  }

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing"/>
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid"/>
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
            promotions,
            publicData,

          } = fieldRenderProps;
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};


          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
          const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError"/>
            </p>
          ) : null;

          const priceData = (price, intl) => {
            if (price && price.currency === config.currency) {
              const formattedPrice = formatMoney(intl, price);
              return { formattedPrice, priceTitle: formattedPrice };
            } else if (price) {
              return {
                formattedPrice: `(${price.currency})`,
                priceTitle: `Unsupported currency (${price.currency})`,
              };
            }
            return {};
          };

          const monewObj = (amoung) => {

            return { '_sdkType': 'Money', 'amount': amoung, 'currency': 'USD' };
          };
          const monewObjForOffer = (amoung) => {

            return { '_sdkType': 'Money', 'amount': amoung, 'currency': 'USD' };
          };
          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData =
            startDate && endDate
              ? {
                unitType,
                unitPrice,
                startDate,
                endDate,

                // NOTE: If unitType is `line-item/units`, a new picker
                // for the quantity should be added to the form.
                quantity: 1,
              }
              : null;
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle"/>
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData}/>
            </div>
          ) : null;
          let total;
          // console.log('promotion2', promotions);
          const findTotal = () => {

            // console.log('promotion2', promotions);
            // console.log('public data', publicData);
            total = 0;

            if (promotions.type === 'direct') {
              console.log("promotionsss",promotions);
              Object.keys(promotions.values).map(function(key) {
                if (promotions.values[key].length != 0 && publicData.values[promotions.values[key]]) {
                  total = total + parseFloat(publicData.values[promotions.values[key]][1]);
                }
              });
              return total;
            } else if (promotions.type === 'offer') {

              Object.keys(promotions.values).map(function(key) {
                total = total + parseFloat(promotions.values[key]);
              });

              return total;
            }
          };

          const findComition = () => {
            if (total > 0) {
              return total * 0.05;
            } else {
              return null;
            }

          };
          console.log("promos",promotions);
          console.log("values",publicData)
          const newbookingInfo = promotions && publicData && promotions.type === 'direct' ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle"/>
              </h3>
              <div className={css.selectedPricelist}>
                {

                  Object.keys(promotions.values).map(function(key) {

                    return promotions.values[key].length != 0 && publicData.values[promotions.values[key]] ?
                      <div>
                        <div className={css.lineItem}>
                          <span
                            className={css.itemLabel}> {publicData.values[promotions.values[key]][0]} promotion </span>
                          <span
                            className={css.itemValue}>{priceData(monewObj(publicData.values[promotions.values[key]][1]), intl).formattedPrice}</span>
                        </div>

                      </div> : null;
                  })}
              </div>
              <hr className={css.totalDivider}/>
              <div>
                <div className={css.lineItem}>
                  <span className={css.itemLabel}> Subtotal</span>
                  <span className={css.itemValue}>{priceData(monewObj(findTotal()), intl).formattedPrice}</span>
                </div>
              </div>

            </div>
          ) : (promotions && publicData && promotions.type === 'offer' ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle"/>
              </h3>
              <div className={css.selectedPricelist}>
                {

                  Object.keys(promotions.values).map(function(key) {


                    return promotions.values[key].length != 0 ?
                      <div>
                        <div className={css.lineItem}>
                          <span
                            className={css.itemLabel}> {key} promotion offer </span>
                          <span
                            className={css.itemValue}>{priceData(monewObjForOffer(promotions.values[key]), intl).formattedPrice}</span>
                        </div>

                      </div> : null;
                  })}
              </div>
              <hr className={css.totalDivider}/>
              <div>
                <div className={css.lineItem}>
                  <span className={css.itemLabel}> Subtotal</span>
                  <span className={css.itemValue}>{priceData(monewObj(findTotal()), intl).formattedPrice}</span>
                </div>
              </div>

            </div>
          ) : null);

          const comition = findComition() ? <div className={css.lineItem}>
            <span className={css.itemLabel}>  Flayyre fee *</span>
            <span className={css.itemValue}>{priceData(monewObj(findComition()), intl).formattedPrice}</span>
          </div> : null;

          const findFinalTotal = () => {
            return parseFloat(total) + parseFloat(findComition());
          };
          const finalTotal = findComition() ? <div>
            <hr className={css.totalDivider}/>
            <div className={css.lineItemTotal}>
              <div className={css.totalLabel}>Total price</div>
              <div className={css.totalPrice}>{priceData(monewObj(findFinalTotal()), intl).formattedPrice}</div>
            </div>
          </div> : null;

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };


          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper,
          );

          const refRequiredMessage = intl.formatMessage({
            id: 'Referrer required',
          });
          const refRequired = validators.required(refRequiredMessage);

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}
              {newbookingInfo}
              {comition}
              {finalTotal}
              <FieldPhoneNumberInput
                className={css.phone}
                name="dates"
                id='dates'
                label='How many days do you need this in?'
                placeholder='Days'
              />
              <OnChange name='dates'>

                {(value, previous) => {
                  this.setState({ dates: value });

                }

                }
              </OnChange>
              {/*<FieldTextInput*/}
              {/*  className={css.password}*/}
              {/*  type="text"*/}
              {/*  id='affiliate'*/}
              {/*  name="referred"*/}
              {/*  autoComplete="new-password"*/}
              {/*  label="Who referred you"*/}
              {/*  placeholder="Who referred you"*/}
              {/*  validate={refRequired}*/}
              {/*/>*/}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook"/>
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  publicData: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
