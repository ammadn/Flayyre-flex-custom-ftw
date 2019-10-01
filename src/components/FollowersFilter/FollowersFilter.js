import React from 'react';
import { bool } from 'prop-types';


import FollowersFilterPlain from './FollowersFilterPlain';
import FollowersFilterPopup from './FollowersFilterPopup';

const FollowersFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <FollowersFilterPopup {...rest} /> : <FollowersFilterPlain {...rest} />;

};

FollowersFilter.defaultProps = {
  showAsPopup: false,
};

FollowersFilter.propTypes = {
  showAsPopup: bool,
};

export default FollowersFilter;
