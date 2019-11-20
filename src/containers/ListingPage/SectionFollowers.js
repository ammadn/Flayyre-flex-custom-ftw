import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './SectionFollowers.css';
import ImgFaceBook from '../../assets/facebook.png';
import ImgTwiter from '../../assets/twitter.png';
import ImgInstar from '../../assets/instagram.png';
import Other from '../../assets/Other.png';
import ImgYouTube from '../../assets/youtube.png';
import config from '../../config';

const SectionFollowers = props => {
  const { publicData } = props;

  return (

    <div className={css.sectionCapacity}>
      <h2 className={css.capacityTitle}>
        <FormattedMessage id="sectionFollowers.title"/>
      </h2>

      {publicData?
        <div className={css.follower__group}>
          <div className={css.follower}>
            <img className={css.img__follower} src={ImgFaceBook}  />
            <label>Facebook</label>
            <label>{publicData.Fb}</label>
            <label>{publicData.FbName}</label>
            <label>{publicData.FbEng}</label>
          </div>
          <div className={css.follower}>
            <img className={css.img__follower} src={ImgTwiter}  />
            <label>Twitter</label>
            <label>{publicData.Twitter}</label>
            <label>{publicData.TwitterName}</label>
            <label>{publicData.TwitterEng}</label>
          </div>
          <div className={css.follower}>
            <img className={css.img__follower} src={ImgInstar}  />
            <label>Instagram</label>
            <label>{publicData.IG}</label>
            <label>{publicData.IGName}</label>
            <label>{publicData.IGEng}</label>
          </div>
          <div className={css.follower}>
            <img className={css.img__follower} src={ImgYouTube}  />
            <label>YouTube</label>
            <label>{publicData.YouTube}</label>
            <label>{publicData.YouTubeName}</label>
            <label>{publicData.YouTubeEng}</label>
          </div>
          <div className={css.follower}>
            <img className={css.img__follower} src={Other}  />
            <label>Other</label>
            <label>{publicData.Other}</label>
            <label>{publicData.OtherName}</label>
            <label>{publicData.OtherEng}</label>
          </div>
        </div>:null
      }
    </div>
  );
};

SectionFollowers.propTypes = {
  publicData: shape({

  }),
}

SectionFollowers.defaultProps = {
  publicData: null,

};

export default SectionFollowers;
