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
import ImgFaceBook from '../../assets/facebook.png';
import ImgTwiter from '../../assets/twitter.png';
import ImgInstar from '../../assets/instagram.png';
import ImgYouTube from '../../assets/youtube.png';
import ImgTikTok from '../../assets/tiktok.png';
import ImgTwitch from '../../assets/twitch.png';
import OtherImg from '../../assets/Other.png';
import { composeValidators } from '../../util/validators';


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
        YouTube,
        TikTok,
        Twitch

      } = fieldRenderProps;


      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed"/>
        </p>
      ) : null;
      const mustBeNumber = (value) => {
        console.log('valllll', value);
        return (typeof value !== 'undefined' && isNaN(value)) ? 'Must be a number' : undefined;
      };

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}


          <div>
            <div className={css.selectingCard}>
              <FieldCheckboxForFollowers
                com='IG'
                change={changeState}
                value="boxIG"
                name='boxIG'
                id='boxIG'/>
              <h4><span><img className={css.img__follower} src={ImgInstar}  />  <label>Instagram</label></span></h4>
              <div className={css.txtField}>
              <div className={css.nameTag}>Followers</div>
                  < FieldTextInput
                    id="IG"
                    name="IG"
                    className={css.title}
                    type="IG"
                    placeholder='Enter Followers'
                    maxLength='55'
                    autoFocus
                    disabled={!IG}
                    validate={composeValidators(mustBeNumber)}
                  />

              <div className={css.nameTag}>Username</div>

                  <FieldTextInput
                    id="IGName"
                    name="IGName"
                    className={css.title}
                    type="IGName"

                    placeholder='Enter Username'
                    maxLength='55'
                    autoFocus
                    disabled={submitDisabled || !IG}
                  />

              <div className={css.nameTag}>Engagement</div>
                  <FieldTextInput
                    id="IGEng"
                    name="IGEng"
                    className={css.title}
                    type="IGEng"

                    placeholder='Enter Engagement'
                    maxLength='55'
                    autoFocus
                    disabled={ !IG}
                    validate={composeValidators(mustBeNumber)}
                  />
              </div>
            </div>
            <div className={css.selectingCard}>
                <FieldCheckboxForFollowers
                  com='Twitter'
                  change={changeState}
                  value="boxTwitter"
                  name='boxTwitter'
                  id='boxTwitter'/>
              <h4><span><img className={css.img__follower} src={ImgTwiter}  />  <label>Twitter</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                  <FieldTextInput
                    id="Twitter"
                    name="Twitter"
                    className={css.title}
                    type="Twitter"

                    placeholder='Twitter Followers'
                    maxLength='55'
                    autoFocus
                    disabled={!Twitter}
                    validate={composeValidators(mustBeNumber)}
                  />

                <div className={css.nameTag}>Username</div>

                  <FieldTextInput
                    id="TwitterName"
                    name="TwitterName"
                    className={css.title}
                    type="TwitterName"

                    placeholder='Twitter Username'
                    maxLength='55'
                    autoFocus
                    disabled={submitDisabled || !Twitter}
                  />

                <div className={css.nameTag}>Engagement</div>
                  <FieldTextInput
                    id="TwitterEng"
                    name="TwitterEng"
                    className={css.title}
                    type="TwitterEng"

                    placeholder='Twitter Engagement'
                    maxLength='55'
                    autoFocus
                    disabled={ !Twitter}
                    validate={composeValidators(mustBeNumber)}
                  />
              </div>
            </div>
            <div className={css.selectingCard}>
                <FieldCheckboxForFollowers
                  com='Fb'
                  change={changeState}
                  value="boxFb"
                  name='boxFb' id='boxFb'/>
              <h4><span><img className={css.img__follower} src={ImgFaceBook}  />  <label>Facebook</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                    <FieldTextInput
                      id="Fb"
                      name="Fb"
                      className={css.title}
                      type="Fb"

                      placeholder='Facebook Followers'
                      maxLength='55'
                      autoFocus
                      disabled={ !Fb}
                      validate={composeValidators(mustBeNumber)}
                    />

                <div className={css.nameTag}>Username</div>

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

                <div className={css.nameTag}>Engagement</div>

                    <FieldTextInput
                      id="FbEng"
                      name="FbEng"
                      className={css.title}
                      type="FbEng"

                      placeholder='FB Engagement'
                      maxLength='55'
                      autoFocus
                      disabled={ !Fb}
                      validate={composeValidators(mustBeNumber)}
                    />
              </div>
            </div>
            <div className={css.selectingCard}>
                  <FieldCheckboxForFollowers com='YouTube' change={changeState} value="boxYouTube" name='boxYouTube'
                                             id='boxYouTube'/>
              <h4><span><img className={css.img__follower} src={ImgYouTube}  />  <label>YouTube</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                    <FieldTextInput
                      id="YouTube"
                      name="YouTube"
                      className={css.title}
                      type="YouTube"
                      placeholder='YouTube Followers'
                      maxLength='55'
                      autoFocus
                      disabled={!YouTube}
                      validate={composeValidators(mustBeNumber)}
                    />

                <div className={css.nameTag}>Username</div>

                    <FieldTextInput
                      id="YouTubeName"
                      name="YouTubeName"
                      className={css.title}
                      type="YouTubeName"

                      placeholder='YouTube Username'
                      maxLength='55'
                      autoFocus
                      disabled={submitDisabled || !YouTube}
                    />

                <div className={css.nameTag}>Engagement</div>
                    <FieldTextInput
                      id="YouTubeEng"
                      name="YouTubeEng"
                      className={css.title}
                      type="YouTubeEng"

                      placeholder='YouTube Engagement'
                      maxLength='55'
                      autoFocus
                      disabled={ !YouTube}
                      validate={composeValidators(mustBeNumber)}
                    />
              </div>
            </div>
            <div className={css.selectingCard}>
                  <FieldCheckboxForFollowers
                    com='TikTok'
                                             change={changeState} value="boxTikTok"
                                             name='boxTikTok' id='boxTikTok'/>
              <h4><span><img className={css.img__follower} src={ImgTikTok}  />  <label>TikTok</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                    <FieldTextInput
                      id="TikTok"
                      name="TikTok"
                      className={css.title}
                      type="TikTok"
                      placeholder='TikTok Followers'
                      maxLength='55'
                      autoFocus
                      disabled={ !TikTok}
                      validate={composeValidators(mustBeNumber)}
                    />

                <div className={css.nameTag}>Username</div>

                    <FieldTextInput
                      id="TikTokName"
                      name="TikTokName"
                      className={css.title}
                      type="TikTokName"

                      placeholder='TikTok Username'
                      maxLength='55'
                      autoFocus
                      disabled={submitDisabled || !TikTok}
                    />

                <div className={css.nameTag}>Engagement</div>
                    <FieldTextInput
                      id="TikTokEng"
                      name="TikTokEng"
                      className={css.title}
                      type="TikTokEng"

                      placeholder='TikTok Engagement'
                      maxLength='55'
                      autoFocus
                      disabled={!TikTok}
                      validate={composeValidators(mustBeNumber)}
                    />
              </div>
            </div>
            <div className={css.selectingCard}>
                  <FieldCheckboxForFollowers
                    com='Twitch'
                    change={changeState}
                    value="boxTwitch"
                    name='boxTwitch' id='boxTwitch'/>
              <h4><span><img className={css.img__follower} src={ImgTwitch}  />  <label>Twitch</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                    <FieldTextInput
                      id="Twitch"
                      name="Twitch"
                      className={css.title}
                      type="Twitch"
                      placeholder='Twitch Followers'
                      maxLength='55'
                      autoFocus
                      disabled={!Twitch}
                      validate={composeValidators(mustBeNumber)}
                    />

                <div className={css.nameTag}>Username</div>

                    <FieldTextInput
                      id="TwitchName"
                      name="TwitchName"
                      className={css.title}
                      type="TwitchName"

                      placeholder='Twitch Username'
                      maxLength='55'
                      autoFocus
                      disabled={submitDisabled || !Twitch}
                    />

                <div className={css.nameTag}>Engagement</div>
                    <FieldTextInput
                      id="TwitchEng"
                      name="TwitchEng"
                      className={css.title}
                      type="TwitchEng"

                      placeholder='Twitch Engagement'
                      maxLength='55'
                      autoFocus
                      disabled={!Twitch}
                      validate={composeValidators(mustBeNumber)}
                    />
              </div>
            </div>
            <div className={css.selectingCard}>
                  <FieldCheckboxForFollowers com='Other' change={changeState} value="boxOther" name='boxOther'
                                             id='boxOther'/>
              <h4><span><img className={css.img__follower} src={OtherImg}  />  <label>Other</label></span></h4>
              <div className={css.txtField}>
                <div className={css.nameTag}>Followers</div>
                    <FieldTextInput
                      id="Other"
                      name="Other"
                      className={css.title}
                      type="Other"
                      placeholder='Other Followers'
                      maxLength='55'
                      autoFocus
                      disabled={!Other}
                      validate={composeValidators(mustBeNumber)}
                    />

                <div className={css.nameTag}>Username</div>

                    <FieldTextInput
                      id="OtherName"
                      name="OtherName"
                      className={css.title}
                      type="OtherName"

                      placeholder='Other Username'
                      maxLength='55'
                      autoFocus
                      disabled={submitDisabled || !Other}
                    />

                <div className={css.nameTag}>Engagement</div>
                    <FieldTextInput
                      id="OtherEng"
                      name="OtherEng"
                      className={css.title}
                      type="OtherEng"

                      placeholder='Other Engagement'
                      maxLength='55'
                      autoFocus
                      disabled={!Other}
                      validate={composeValidators(mustBeNumber)}
                    />
              </div>
            </div>
            {/*IG*/}
            {/*<div className={css.Follower_types}>*/}
            {/*<div className={css.Follower}>*/}
            {/*  <FieldCheckboxForFollowers*/}
            {/*    com='IG'*/}
            {/*    change={changeState}*/}
            {/*    value="boxIG"*/}
            {/*    name='boxIG'*/}
            {/*    id='boxIG'/>*/}
            {/*  <label>Instagram followers</label>*/}
            {/*</div>*/}

            {/*<div className={css.Follower__details}>*/}
            {/*  < FieldTextInput*/}
            {/*    id="IG"*/}
            {/*    name="IG"*/}
            {/*    className={css.title}*/}
            {/*    type="IG"*/}
            {/*    placeholder='Instagram Followers'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !IG}*/}
            {/*  />*/}

            {/*  <FieldTextInput*/}
            {/*    id="IGName"*/}
            {/*    name="IGName"*/}
            {/*    className={css.title}*/}
            {/*    type="IGName"*/}

            {/*    placeholder='Instagram Username'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !IG}*/}
            {/*  />*/}
            {/*  <FieldTextInput*/}
            {/*    id="IGEng"*/}
            {/*    name="IGEng"*/}
            {/*    className={css.title}*/}
            {/*    type="IGEng"*/}

            {/*    placeholder='Instagram Engagement'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !IG}*/}
            {/*  />*/}


            {/*</div>*/}
            {/*</div>*/}

            {/*/!*Twitter*!/*/}
            {/*<div className={css.Follower_types}>*/}
            {/*<div className={css.Follower}>*/}
            {/*  <FieldCheckboxForFollowers*/}
            {/*    com='Twitter'*/}
            {/*    change={changeState}*/}
            {/*    value="boxTwitter"*/}
            {/*    name='boxTwitter'*/}
            {/*    id='boxTwitter'/>*/}
            {/*  <label>Twitter Followers</label>*/}
            {/*</div>*/}

            {/*<div className={css.Follower__details}>*/}
            {/*  <FieldTextInput*/}
            {/*    id="Twitter"*/}
            {/*    name="Twitter"*/}
            {/*    className={css.title}*/}
            {/*    type="Twitter"*/}

            {/*    placeholder='Twitter Followers'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !Twitter}*/}
            {/*  />*/}

            {/*  <FieldTextInput*/}
            {/*    id="TwitterName"*/}
            {/*    name="TwitterName"*/}
            {/*    className={css.title}*/}
            {/*    type="TwitterName"*/}

            {/*    placeholder='Twitter Username'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !Twitter}*/}
            {/*  />*/}
            {/*  <FieldTextInput*/}
            {/*    id="TwitterEng"*/}
            {/*    name="TwitterEng"*/}
            {/*    className={css.title}*/}
            {/*    type="TwitterEng"*/}

            {/*    placeholder='Twitter Engagement'*/}
            {/*    maxLength='55'*/}
            {/*    autoFocus*/}
            {/*    disabled={submitDisabled || !Twitter}*/}
            {/*  />*/}

            {/*</div>*/}
            {/*</div>*/}

            {/*/!*Facebook*!/*/}
            {/*<div className={css.Follower_types}>*/}
            {/*<div className={css.Follower}>*/}
            {/*  <FieldCheckboxForFollowers*/}
            {/*    com='Fb'*/}
            {/*    change={changeState}*/}
            {/*    value="boxFb"*/}
            {/*    name='boxFb' id='boxFb'/>*/}
            {/*  <label>Facebook Followers</label>*/}
            {/*</div>*/}

            {/*  <div className={css.Follower__details}>*/}
            {/*    <FieldTextInput*/}
            {/*      id="Fb"*/}
            {/*      name="Fb"*/}
            {/*      className={css.title}*/}
            {/*      type="Fb"*/}

            {/*      placeholder='Facebook Followers'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Fb}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="FbName"*/}
            {/*      name="FbName"*/}
            {/*      className={css.title}*/}
            {/*      type="FbName"*/}

            {/*      placeholder='Facebook Username'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Fb}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="FbEng"*/}
            {/*      name="FbEng"*/}
            {/*      className={css.title}*/}
            {/*      type="FbEng"*/}

            {/*      placeholder='FB Engagement'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Fb}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}


            {/*/!*Youtube*!/*/}
            {/*<div className={css.Follower_types}>*/}
            {/*  <div className={css.Follower}>*/}
            {/*    <FieldCheckboxForFollowers com='YouTube' change={changeState} value="boxYouTube" name='boxYouTube'*/}
            {/*                               id='boxYouTube'/>*/}
            {/*    <label>YouTube</label>*/}
            {/*  </div>*/}

            {/*  <div className={css.Follower__details}>*/}
            {/*    <FieldTextInput*/}
            {/*      id="YouTube"*/}
            {/*      name="YouTube"*/}
            {/*      className={css.title}*/}
            {/*      type="YouTube"*/}
            {/*      placeholder='YouTube Followers'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !YouTube}*/}
            {/*    />*/}

            {/*    <FieldTextInput*/}
            {/*      id="YouTubeName"*/}
            {/*      name="YouTubeName"*/}
            {/*      className={css.title}*/}
            {/*      type="YouTubeName"*/}

            {/*      placeholder='YouTube Username'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !YouTube}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="YouTubeEng"*/}
            {/*      name="YouTubeEng"*/}
            {/*      className={css.title}*/}
            {/*      type="YouTubeEng"*/}

            {/*      placeholder='YouTube Engagement'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !YouTube}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}

            {/*/!*TikTok*!/*/}

            {/*<div className={css.Follower_types}>*/}
            {/*  <div className={css.Follower}>*/}
            {/*    <FieldCheckboxForFollowers com='TikTok' change={changeState} value="boxTikTok" name='boxTikTok' id='boxTikTok'/>*/}
            {/*    <label>TikTok</label>*/}
            {/*  </div>*/}

            {/*  <div className={css.Follower__details}>*/}
            {/*    <FieldTextInput*/}
            {/*      id="TikTok"*/}
            {/*      name="TikTok"*/}
            {/*      className={css.title}*/}
            {/*      type="TikTok"*/}
            {/*      placeholder='TikTok Followers'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !TikTok}*/}
            {/*    />*/}

            {/*    <FieldTextInput*/}
            {/*      id="TikTokName"*/}
            {/*      name="TikTokName"*/}
            {/*      className={css.title}*/}
            {/*      type="TikTokName"*/}

            {/*      placeholder='TikTok Username'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !TikTok}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="TikTokEng"*/}
            {/*      name="TikTokEng"*/}
            {/*      className={css.title}*/}
            {/*      type="TikTokEng"*/}

            {/*      placeholder='TikTok Engagement'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !TikTok}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}

            {/*/!*Twitch*!/*/}
            {/*<div className={css.Follower_types}>*/}
            {/*  <div className={css.Follower}>*/}
            {/*    <FieldCheckboxForFollowers com='Twitch' change={changeState} value="boxTwitch" name='boxTwitch' id='boxTwitch'/>*/}
            {/*    <label>Twitch</label>*/}
            {/*  </div>*/}

            {/*  <div className={css.Follower__details}>*/}
            {/*    <FieldTextInput*/}
            {/*      id="Twitch"*/}
            {/*      name="Twitch"*/}
            {/*      className={css.title}*/}
            {/*      type="Twitch"*/}
            {/*      placeholder='Twitch Followers'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Twitch}*/}
            {/*    />*/}

            {/*    <FieldTextInput*/}
            {/*      id="TwitchName"*/}
            {/*      name="TwitchName"*/}
            {/*      className={css.title}*/}
            {/*      type="TwitchName"*/}

            {/*      placeholder='Twitch Username'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Twitch}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="TwitchEng"*/}
            {/*      name="TwitchEng"*/}
            {/*      className={css.title}*/}
            {/*      type="TwitchEng"*/}

            {/*      placeholder='Twitch Engagement'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Twitch}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}

            {/*/!*Other*!/*/}
            {/*<div className={css.Follower_types}>*/}
            {/*  <div className={css.Follower}>*/}
            {/*    <FieldCheckboxForFollowers com='Other' change={changeState} value="boxOther" name='boxOther'*/}
            {/*                               id='boxOther'/>*/}
            {/*    <label>Other</label>*/}
            {/*  </div>*/}

            {/*  <div className={css.Follower__details}>*/}
            {/*    <FieldTextInput*/}
            {/*      id="Other"*/}
            {/*      name="Other"*/}
            {/*      className={css.title}*/}
            {/*      type="Other"*/}
            {/*      placeholder='Other Followers'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Other}*/}
            {/*    />*/}

            {/*    <FieldTextInput*/}
            {/*      id="OtherName"*/}
            {/*      name="OtherName"*/}
            {/*      className={css.title}*/}
            {/*      type="OtherName"*/}

            {/*      placeholder='Other Username'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Other}*/}
            {/*    />*/}
            {/*    <FieldTextInput*/}
            {/*      id="OtherEng"*/}
            {/*      name="OtherEng"*/}
            {/*      className={css.title}*/}
            {/*      type="OtherEng"*/}

            {/*      placeholder='Other Engagement'*/}
            {/*      maxLength='55'*/}
            {/*      autoFocus*/}
            {/*      disabled={submitDisabled || !Other}*/}
            {/*    />*/}

            {/*  </div>*/}
            {/*</div>*/}
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
