import React from 'react';
import { bool } from 'prop-types';


import FollowersFilterPlain from './FollowersFilterPlain';
import FollowersFilterPopup from './FollowersFilterPopup';
import FollowersFilterPopupMobile from './FollowersFilterPopupMobile';

const FollowersFilterMobile = props => {
  const { showAsPopup, ...rest } = props;
  return <FollowersFilterPlain {...rest} /> ;

};

FollowersFilterMobile.defaultProps = {
  showAsPopup: false,
};

FollowersFilterMobile.propTypes = {
  showAsPopup: bool,
};

export default FollowersFilterMobile;
