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
              <FieldCheckboxForFollowers
                com='IG'
                change={changeState}
                value="boxIG"
                name='boxIG'
                id='boxIG'/>
              <label>Instagram followers</label>
            </div>

            <div className={css.Follower__details}>
              < FieldTextInput
                id="IG"
                name="IG"
                className={css.title}
                type="IG"
                placeholder='Instagram Followers'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !IG}
              />

              <FieldTextInput
                id="IGName"
                name="IGName"
                className={css.title}
                type="IGName"

                placeholder='Instagram Username'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />
              <FieldTextInput
                id="IGEng"
                name="IGEng"
                className={css.title}
                type="IGEng"

                placeholder='Instagram Engagement'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />


            </div>

            <div className={css.Follower}>
              <FieldCheckboxForFollowers
                com='Twitter'
                change={changeState}
                value="boxTwitter"
                name='boxTwitter'
                id='boxTwitter'/>
              <label>Twitter Followers</label>
            </div>

            <div className={css.Follower__details}>
              <FieldTextInput
                id="Twitter"
                name="Twitter"
                className={css.title}
                type="Twitter"

                placeholder='Twitter Followers'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Twitter}
              />

              <FieldTextInput
                id="TwitterName"
                name="TwitterName"
                className={css.title}
                type="TwitterName"

                placeholder='Twitter Username'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />
              <FieldTextInput
                id="TwitterEng"
                name="TwitterEng"
                className={css.title}
                type="TwitterEng"

                placeholder='Twitter Engagement'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />

            </div>

            <div className={css.Follower}>
              <FieldCheckboxForFollowers
                com='Fb'
                change={changeState}
                value="boxFb"
                name='boxFb' id='boxFb'/>
              <label>Facebook Followers</label>
            </div>


            <div className={css.Follower__details}>
              <FieldTextInput
                id="Fb"
                name="Fb"
                className={css.title}
                type="Fb"

                placeholder='Facebook Followers'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />
              <FieldTextInput
                id="FbName"
                name="FbName"
                className={css.title}
                type="FbName"

                placeholder='Facebook Username'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />
              <FieldTextInput
                id="FbEng"
                name="FbEng"
                className={css.title}
                type="FbEng"

                placeholder='FB Engagement'
                maxLength='55'
                autoFocus
                disabled={submitDisabled || !Fb}
              />

            </div>

            <div className={css.Follower_types}>
              <div className={css.Follower}>
                <FieldCheckboxForFollowers com='Other' change={changeState} value="boxOther" name='boxOther'
                                           id='boxOther'/>
                <label>Other</label>
              </div>

              <div className={css.Follower__details}>
                <FieldTextInput
                  id="Other"
                  name="Other"
                  className={css.title}
                  type="Other"
                  placeholder='Other Followers'
                  maxLength='55'
                  autoFocus
                  disabled={submitDisabled || !Other}
                />

                <FieldTextInput
                  id="OtherName"
                  name="OtherName"
                  className={css.title}
                  type="OtherName"

                  placeholder='Other Username'
                  maxLength='55'
                  autoFocus
                  disabled={submitDisabled || !Fb}
                />
                <FieldTextInput
                  id="OtherEng"
                  name="OtherEng"
                  className={css.title}
                  type="OtherEng"

                  placeholder='Other Engagement'
                  maxLength='55'
                  autoFocus
                  disabled={submitDisabled || !Fb}
                />

              </div>
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
