import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingFollowersForm } from '../../forms';
import config from '../../config.js';

import css from './EditListingFollowersPanel.css';

const EditListingFollowersPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    changeState,
    followers,
    IG,
    Fb,
    Twitter,
    Other,
    YouTube,
    TikTok,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingFollowersPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingFollowersPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingFollowersForm
        IG={IG}
        Fb={Fb}
        Twitter={Twitter}
        Other={Other}
        YouTube={YouTube}
        TikTok={TikTok}
        changeState={changeState}
        followers={followers}
        className={css.form}
        initialValues={{ capacity: publicData.capacity }}
        onSubmit={values => {
          const { capacity,IG,Twitter,Other,Fb,boxOther,boxTwitter,boxIG,boxFb,maxFollowers,boxYouTube
            ,YouTubeName,YouTubeEng
            ,IGName,IGEng
            ,TwitterName,TwitterEng
            ,FbName,FbEng
            ,OtherName,OtherEng,YouTube
            ,boxTikTok,TikTokName,TikTokEng,TikTok
          } = values;
          let max=0;
          if(IG>max){
          max=IG;
          }else {
          if(Twitter>max){
            max=Twitter;
          }else{
            if(Other>max){
              max=Other;
            }else {
              if(Fb>max){
                max=Fb;
              }else{
                if (YouTube > max) {
                  max = YouTube;
                } else {
                  if (TikTok > max) {
                    max = TikTok;
                  }
                }
              }
            }
          }}
          max=parseInt(max);
          const updateValues = {
            publicData: {
              max,
              capacity,
              IG,
              boxFb,
              boxTwitter,
              boxOther,
              boxIG,
              Other,
              Twitter,
              Fb,IGName,IGEng
              ,TwitterName,TwitterEng
              ,FbName,FbEng
              ,OtherName,OtherEng,
              boxYouTube
              ,YouTubeName,YouTubeEng,
              YouTube, boxTikTok,TikTokName,TikTokEng,TikTok
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}

      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingFollowersPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingFollowersPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingFollowersPanel;
