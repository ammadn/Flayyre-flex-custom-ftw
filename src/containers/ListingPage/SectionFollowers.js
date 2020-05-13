import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './SectionFollowers.css';
import ImgFaceBook from '../../assets/facebook.png';
import ImgTwiter from '../../assets/twitter.png';
import ImgInstar from '../../assets/instagram.png';
import ImgTikTok from '../../assets/tiktok.png';
import ImgTwitch from '../../assets/twitch.png';
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

          <div className={css.rootOfOfferCard}>
            {publicData.Fb?(<div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgFaceBook}  />  <label>Facebook</label></span></h4>
            <div className={css.txtField}>
              {publicData.Fb?(<div><div className={css.nameTag}>Followers</div>
                <label>{publicData.Fb}</label></div>):null}

              {publicData.FbName?(<div><div className={css.nameTag}>Username</div>
                <label>{publicData.FbName}</label></div>):null}

              {publicData.FbEng?(<div><div className={css.nameTag}>Engagement</div>
                  <label>{publicData.FbEng}</label></div>):null}
            </div>
          </div>):null}
            {publicData.Twitter?(  <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgTwiter}  />  <label>Twitter</label></span></h4>
            <div className={css.txtField}>

              {publicData.Twitter?(<div><div className={css.nameTag}>Followers</div>
                <label>{publicData.Twitter}</label></div>):null}
                {publicData.TwitterName?(<div><div className={css.nameTag}>Username</div>
                <label>{publicData.TwitterName}</label></div>):null}
                  {publicData.TwitterEng?(<div><div className={css.nameTag}>Engagement</div>
                <label>{publicData.TwitterEng}</label></div>):null}
            </div>
          </div>):null}
              {publicData.IG?(  <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgInstar}  /><label>Instagram</label></span></h4>
            <div className={css.txtField}>

              {publicData.IG?(<div><div className={css.nameTag}>Followers</div>
                <label>{publicData.IG}</label></div>):null}
                {publicData.IGName?(<div><div className={css.nameTag}>Username</div>
                <label>{publicData.IGName}</label></div>):null}
                  {publicData.IGEng?(<div><div className={css.nameTag}>Engagement</div>
                <label>{publicData.IGEng}</label></div>):null}
            </div>
          </div>):null}
                  {publicData.YouTube?(   <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgYouTube}  /><label>YouTube</label></span></h4>
            <div className={css.txtField}>

              {publicData.YouTube?(<div><div className={css.nameTag}>Followers</div>
                <label>{publicData.YouTube}</label></div>):null}
                {publicData.YouTubeName?(<div><div className={css.nameTag}>Username</div>
                <label>{publicData.YouTubeName}</label></div>):null}
                  {publicData.YouTubeEng?(<div><div className={css.nameTag}>Engagement</div>
                <label>{publicData.YouTubeEng}</label></div>):null}
            </div>
          </div>):null}
                      {publicData.TikTok?(  <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgTikTok}  /><label>TikTok</label></span></h4>
            <div className={css.txtField}>

              {publicData.TikTok?(<div><div className={css.nameTag}>Followers</div>
                <label>{publicData.TikTok}</label></div>):null}
                {publicData.TikTokName?(<div><div className={css.nameTag}>Username</div>
                <label>{publicData.TikTokName}</label></div>):null}
                  {publicData.TikTokEng?(<div><div className={css.nameTag}>Engagement</div>
                <label>{publicData.TikTokEng}</label></div>):null}
            </div>
          </div>):null}
                          {publicData.Twitch?(   <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={ImgTwitch}  /><label>Twitch</label></span></h4>
              <div className={css.txtField}>

                {publicData.Twitch?(<div><div className={css.nameTag}>Followers</div>
                  <label>{publicData.Twitch}</label></div>):null}
                  {publicData.TwitchName?(<div><div className={css.nameTag}>Username</div>
                  <label>{publicData.TwitchName}</label></div>):null}
                    {publicData.TwitchEng?(<div><div className={css.nameTag}>Engagement</div>
                  <label>{publicData.TwitchEng}</label></div>):null}
              </div>
            </div>):null}
                              {publicData.Other?(  <div className={css.selectingCard}><h4><span><img className={css.img__follower} src={Other}  /> <label>Other</label></span></h4>
              <div className={css.txtField}>

                {publicData.Other?(<div>
                  <div className={css.nameTag}>Followers</div>
                  <label>{publicData.Other}</label></div>):null}
                  {publicData.OtherName?(<div><div className={css.nameTag}>Username</div>
                  <label>{publicData.OtherName}</label></div>):null}
                    {publicData.OtherEng?(<div><div className={css.nameTag}>Engagement</div>
                  <label>{publicData.OtherEng}</label></div>):null}
              </div>
            </div>):null}
          {/*<div className={css.follower}>*/}
          {/*  <div className={css.emptyImg} ></div>*/}
          {/*  <label><br/></label>*/}
          {/*  <label>Followers</label>*/}
          {/*  <label>Username</label>*/}
          {/*  <label>Engagement</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgFaceBook}  />*/}
          {/*  <label>Facebook</label>*/}
          {/*  <label>{publicData.Fb}</label>*/}
          {/*  <label>{publicData.FbName}</label>*/}
          {/*  <label>{publicData.FbEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgTwiter}  />*/}
          {/*  <label>Twitter</label>*/}
          {/*  <label>{publicData.Twitter}</label>*/}
          {/*  <label>{publicData.TwitterName}</label>*/}
          {/*  <label>{publicData.TwitterEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgInstar}  />*/}
          {/*  <label>Instagram</label>*/}
          {/*  <label>{publicData.IG}</label>*/}
          {/*  <label>{publicData.IGName}</label>*/}
          {/*  <label>{publicData.IGEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgYouTube}  />*/}
          {/*  <label>YouTube</label>*/}
          {/*  <label>{publicData.YouTube}</label>*/}
          {/*  <label>{publicData.YouTubeName}</label>*/}
          {/*  <label>{publicData.YouTubeEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgTikTok}  />*/}
          {/*  <label>TikTok</label>*/}
          {/*  <label>{publicData.TikTok}</label>*/}
          {/*  <label>{publicData.TikTokName}</label>*/}
          {/*  <label>{publicData.TikTokEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={ImgTwitch}  />*/}
          {/*  <label>Twitch</label>*/}
          {/*  <label>{publicData.Twitch}</label>*/}
          {/*  <label>{publicData.TwitchName}</label>*/}
          {/*  <label>{publicData.TwitchEng}</label>*/}
          {/*</div>*/}
          {/*<div className={css.follower}>*/}
          {/*  <img className={css.img__follower} src={Other}  />*/}
          {/*  <label>Other</label>*/}
          {/*  <label>{publicData.Other}</label>*/}
          {/*  <label>{publicData.OtherName}</label>*/}
          {/*  <label>{publicData.OtherEng}</label>*/}
          {/*</div>*/}
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
