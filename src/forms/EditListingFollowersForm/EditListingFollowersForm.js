import React from 'react';
import { bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Button, FieldTextInput, Form } from '../../components';
import css from './EditListingFollowersForm.css';
import FieldCheckboxForFollowers from '../../components/FieldCheckbox/FieldCheckboxForFollowers';


export const EditListingFollowersFormComponent = props => (

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
        updateError,
        updateInProgress,
        changeState,
        followers,
        IG,
        Fb,
        Twitter,
        Other,

      } = fieldRenderProps;


      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed"/>
        </p>
      ) : null;



      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          followers
          <FieldCheckboxForFollowers com='followers' change={changeState} value="Followers" name='followers' id='followers'/>

          {followers ?
            <div>
              Fb Followers
              <FieldCheckboxForFollowers com='Fb' change={changeState} value="boxFb" name='boxFb' id='boxFb'/>


              {Fb ?
                <FieldTextInput
                  id="Fb"
                  name="Fb"
                  className={css.title}
                  type="Fb"
                  label='Fb'
                  placeholder='Fb'
                  maxLength='55'
                  autoFocus
                  disabled={submitDisabled}
                />:null}
              IG followers
              <FieldCheckboxForFollowers com='IG' change={changeState} value="boxIG" name='boxIG' id='boxIG'/>

              {IG ?
            < FieldTextInput
            id = "IG"
            name="IG"
            className={css.title}
            type="IG"
            label='IG'
            placeholder='IG'
            maxLength='55'
            autoFocus
            disabled={submitDisabled}
            />:null}
              Twitter Followers
              <FieldCheckboxForFollowers com='Twitter' change={changeState} value="boxTwitter" name='boxTwitter' id='boxTwitter'/>


              {Twitter ?
            <FieldTextInput
            id="Twitter"
            name="Twitter"
            className={css.title}
            type="Twitter"
            label='Twitter'
            placeholder='Twitter'
            maxLength='55'
            autoFocus
            disabled={submitDisabled}
            />:null}
              Other
              <FieldCheckboxForFollowers com='Other' change={changeState} value="boxOther" name='boxOther' id='boxOther'/>

              {Other ?

              <FieldTextInput
                id="Other"
                name="Other"
                className={css.title}
                type="Other"
                label='Other'
                placeholder='Other'
                maxLength='55'
                autoFocus
                disabled={submitDisabled}
              />:null}

            </div> :null}

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


EditListingFollowersFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingFollowersFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,

};

export default compose(injectIntl)(EditListingFollowersFormComponent);
