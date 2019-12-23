import React from 'react';
import { shape } from 'prop-types';
import { FieldRadioButton, Form } from '../../components';
import { Form as FinalForm } from 'react-final-form';
import FieldCheckboxComponent from '../../components/FieldCheckbox/FieldCheckbox';
import css from './SectionSelectPromotionType.css';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import { formatCurrencyMajorUnit, formatMoney } from '../../util/currency';
import { Money } from 'sharetribe-flex-sdk/src/types';
import config from '../../config';
import FieldTextInputNew from '../../components/FieldTextInputNew/FieldTextInputNew';


const SectionSelectPromotionType = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
        currencyConfig,
        intl,
      } = fieldRenderProps;

      // console.log('pub', props.publicData);

      console.log('pub data', props.publicData);

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


      const monewObj =(amoung)=>{

        return {"_sdkType": "Money", "amount": amoung, "currency": "USD"}
      }
      let promotionTypes = props.publicData ? Object.keys(props.publicData.values).map(function(key) {
        return <div className={css.promotionGroup}>
          <div className={css.promotionSubGrop}>
            <FieldCheckboxComponent
              key={key} value={key}
              name={props.publicData.values[key][0]}
              id={props.publicData.values[key][0]}/>

            {props.publicData.values[key][0]} promotion
          </div>

          <div className={css.promotionPrice}> {priceData(monewObj(props.publicData.values[key][1]), intl).formattedPrice}</div>
        </div>;
      }) : null;

      const mustBeNumber = (value) => {
        console.log('valllll',value);
       return  (typeof value !== 'undefined'&&isNaN(value)) ? 'Must be a number' : undefined};
      const minValue = min => value =>
        isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
      const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined);

      return (

        <div className={css.sectionPromotionPrice}>

          <Form onChange={value => {
            console.log('render props', fieldRenderProps.values);
            handleSubmit();
          }}>
            {props.publicData && props.publicData.pricetype.direct_pricing && props.publicData.pricetype.offer_listing ? (
              <div>
                <div className={css.radioButtonRow}>
                  <FieldRadioButton
                    id="direct"
                    name="paymentType"
                    label='Choose your influencer marketing service'
                    value="direct"
                    showAsRequired={true}
                  />
                  <FieldRadioButton
                    id="offer"
                    name="paymentType"
                    label=' Put in an Offer'
                    value="offer"
                    showAsRequired={true}
                  />
                </div>
              </div>
            ) : null}

            {
              (!fieldRenderProps.values.paymentType || fieldRenderProps.values.paymentType === 'direct') && props.publicData && props.publicData.pricetype.direct_pricing ?

                (promotionTypes) : (

                  (!fieldRenderProps.values.paymentType || fieldRenderProps.values.paymentType === 'offer') && props.publicData && props.publicData.pricetype.offer_listing ? (
                    <div>
                      Enter an offer
                      <FieldTextInputNew label="Brand Sponsorship" validate={composeValidators(mustBeNumber, minValue(5))} name="Brand Sponsorship" id="offer"/>
                      <FieldTextInputNew label="IG Post Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="IG Post Promo" id="offerIGPost"/>
                      <FieldTextInputNew label="IG Story Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="IG Story Promo" id="offerIGStory"/>
                      <FieldTextInputNew label="Twitter Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="Twitter Promo" id="offerTwitter"/>
                      <FieldTextInputNew label="FB Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="FB Promo" id="offerFB"/>
                      <FieldTextInputNew label="Youtube Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="Youtube Promo" id="offerYoutube"/>
                      <FieldTextInputNew label="TikTok Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="TikTok Promo" id="offerTikTok"/>
                      <FieldTextInputNew label="Twitch Promo" validate={composeValidators(mustBeNumber, minValue(5))} name="Twitch Promo" id="offerTwitch"/>
                      <FieldTextInputNew label="Others " validate={composeValidators(mustBeNumber, minValue(5))} name="Others" id="offerOthers"/>
                    </div>
                  ) : null)
            }


          </Form>
        </div>

      );
    }}
  />
);

SectionSelectPromotionType.propTypes = {
  publicData: shape({}),
};

SectionSelectPromotionType.defaultProps = {
  publicData: null,

};

export default SectionSelectPromotionType;
