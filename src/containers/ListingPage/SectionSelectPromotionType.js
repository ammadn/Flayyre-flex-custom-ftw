import React from 'react';
import { shape } from 'prop-types';
import { FieldRadioButton, Form } from '../../components';
import { Form as FinalForm } from 'react-final-form';
import FieldCheckboxComponent from '../../components/FieldCheckbox/FieldCheckbox';
import css from '../../forms/PayoutDetailsForm/PayoutDetailsForm.css';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';


const SectionSelectPromotionType = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
      } = fieldRenderProps;

      // console.log('pub', props.publicData);

      console.log('pub data', props.publicData);


      let promotionTypes = props.publicData ? Object.keys(props.publicData.values).map(function(key) {
        return <div><FieldCheckboxComponent key={key} value={key} name={props.publicData.values[key][0]}
                                            id={props.publicData.values[key][0]}/>
          {props.publicData.values[key][0]} promotion ${props.publicData.values[key][1]}
        </div>;
      }) : null;

      const mustBeNumber =value => (isNaN(value) ? 'Must be a number' : undefined);
      const minValue = min => value =>
        isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
      const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

      return (

        <div>

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
                    label='direct payment categories'
                    value="direct"
                    showAsRequired={true}
                  />
                  <FieldRadioButton
                    id="offer"
                    name="paymentType"
                    label='Offer price'
                    value="offer"
                    showAsRequired={true}
                  />
                </div>
              </div>
            ) : null}

            {
              (!fieldRenderProps.values.paymentType || fieldRenderProps.values.paymentType === 'direct') && props.publicData && props.publicData.pricetype.direct_pricing ?

                (promotionTypes) :(

              (!fieldRenderProps.values.paymentType || fieldRenderProps.values.paymentType === 'offer') && props.publicData && props.publicData.pricetype.offer_listing ? (
                <div>
                  Enter an offer
                  <FieldTextInput  validate={composeValidators( mustBeNumber, minValue(5))} name="offer" id="offer"/>
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
