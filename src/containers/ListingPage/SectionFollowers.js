import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionFollowers = props => {
  const { publicData } = props;


  console.log('capacity', publicData);
  return (

    <div className={css.sectionCapacity}>
      <h2 className={css.capacityTitle}>
        <FormattedMessage id="sectionFollowers.title"/>
      </h2>
      <p className={css.capacity}>followers</p>
      <ul>
        {publicData.Fb ?
          <li>Fb    &#9; : {publicData.Fb}</li> : null
        }
        {publicData.Twitter ?
          <li>Twitter &#9; : {publicData.Twitter}</li> : null}
        {publicData.IG ?
          <li>IG     &#9; : {publicData.IG}</li> : null}
        {publicData.Other ?
          <li>Other  &#9; : {publicData.Other}</li> : null}
      </ul>
    </div>
  );
};

SectionFollowers.propTypes = {
  publicData: shape({

  }),
};

export default SectionFollowers;
