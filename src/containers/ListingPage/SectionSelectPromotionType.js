import React from 'react';
import { shape } from 'prop-types';
import FieldTextInput from '../../components/FieldTextInput/FieldTextInput';
import {
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

const SectionSelectPromotionType = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
      } = fieldRenderProps;

      // console.log('pub', props.publicData);

console.log(props.publicData);



      let tifOptions =props.publicData? Object.keys(props.publicData.values).map(function(key) {
        return <div> <FieldCheckboxComponent key={key} value={key} name={props.publicData.values[key][0]} id={props.publicData.values[key][0]}/>
          {props.publicData.values[key][0]} promotion ${props.publicData.values[key][1]}
        </div>
      }):null


      return (

        <div>

          <Form onChange={value => {
            handleSubmit();
          }}>
            {
              tifOptions
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
