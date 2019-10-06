import React from 'react';
import { shape } from 'prop-types';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import {
  FieldRadioButton,
  Footer,
  Form,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  Page,
} from '../../components';
import { Form as FinalForm } from 'react-final-form';
import FieldCheckboxComponent from '../../components/FieldCheckbox/FieldCheckbox';
import FieldRadioButtonComponent from '../../components/FieldRadioButton/FieldRadioButton';
import css from '../../forms/PayoutDetailsForm/PayoutDetailsForm.css';

const SectionSelectPromotionType = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
      } = fieldRenderProps;

      // console.log('pub', props.publicData);

console.log(props.publicData);



      let promotionTypes =props.publicData? Object.keys(props.publicData.values).map(function(key) {
        return <div> <FieldCheckboxComponent key={key} value={key} name={props.publicData.values[key][0]} id={props.publicData.values[key][0]}/>
          {props.publicData.values[key][0]} promotion ${props.publicData.values[key][1]}
        </div>
      }):null

      return (

        <div>

          <Form onChange={value => {
            console.log('render props', fieldRenderProps.values)
            handleSubmit();
          }}>
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

            { fieldRenderProps.values.paymentType==='direct'?

              (promotionTypes):null
            }



            {
              fieldRenderProps.values.paymentType==='offer'&& props.publicData && props.publicData.pricetype.offer_listing?(
                <div>
                  Enter an offer
                <FieldTextInput name="offer" id="offer" />
                </div>
              ):null
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
