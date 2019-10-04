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
import css from './ListingPage.css';
import { FormattedMessage } from 'react-intl';

const SectionSelectPromotionType = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
      } = fieldRenderProps;

      // console.log('pub', props.publicData);

console.log(props.publicData);




      return (

        <div>

          <Form onChange={value => {
            handleSubmit(value);
          }}>
            {

            }
            <FieldTextInput
              id='tt'
              name='tt'
              value='tt'

            />
            <div>Section select promotion type</div>

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
