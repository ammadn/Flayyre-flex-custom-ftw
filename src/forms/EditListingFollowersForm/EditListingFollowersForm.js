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


          <div>
            <div className={css.Follower}>
              <FieldCheckboxForFollowers com='Fb' change={changeState} value="boxFb" name='boxFb' id='boxFb'/>
              <label>Fb Followers</label>
            </div>

            <FieldTextInput
              id="Fb"
              name="Fb"
              className={css.title}
              type="Fb"

              placeholder=''
              maxLength='55'
              autoFocus
              disabled={submitDisabled || !Fb}
            />


            <div className={css.Follower}>
              <FieldCheckboxForFollowers
                com='IG'
                change={changeState}
                value="boxIG"
                name='boxIG'
                id='boxIG'/>
              <label>IG followers</label>
            </div>


            < FieldTextInput
              id="IG"
              name="IG"
              className={css.title}
              type="IG"
              placeholder=''
              maxLength='55'
              autoFocus
              disabled={submitDisabled || !IG}
            />


            <div className={css.Follower}>
              <FieldCheckboxForFollowers
                com='Twitter'
                change={changeState}
                value="boxTwitter"
                name='boxTwitter'
                id='boxTwitter'/>
              <label>Twitter Followers</label>
            </div>


            <FieldTextInput
              id="Twitter"
              name="Twitter"
              className={css.title}
              type="Twitter"

              placeholder=''
              maxLength='55'
              autoFocus
              disabled={submitDisabled || !Twitter}
            />

            <div className={css.Follower_types}>
              <div className={css.Follower}>
                <FieldCheckboxForFollowers com='Other' change={changeState} value="boxOther" name='boxOther'
                                           id='boxOther'/>
                <label>Other</label>
              </div>


              <FieldTextInput
                id="Other"
                name="Other"
                className={css.title}
                type="Other"
                placeholder=''
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Other}
              />
            </div>
          </div>

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
