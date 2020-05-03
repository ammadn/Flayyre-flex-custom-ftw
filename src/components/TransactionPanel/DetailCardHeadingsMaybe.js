import React from 'react';
import AddressLinkMaybe from './AddressLinkMaybe';

import css from './TransactionPanel.css';

// Functional component as a helper to build detail card headings
const DetailCardHeadingsMaybe = props => {
  const {
    showDetailCardHeadings,
    listingTitle,
    subTitle,
    location,
    geolocation,
    showAddress,
    transaction
  } = props;
console.log("trr",transaction.booking.attributes.displayEnd);
function getdate() {
  var str=transaction.booking.attributes.displayEnd.toString();
  return str.substring(0,25);
}
  return showDetailCardHeadings ? (
    <div className={css.detailCardHeadings}>
      <h2 className={css.detailCardTitle}>{listingTitle}</h2>
      <p className={css.detailCardSubtitle}>{subTitle}</p>
      <p className={css.detailCardSubtitle}>{getdate()}</p>
      <AddressLinkMaybe location={location} geolocation={geolocation} showAddress={showAddress} />
    </div>
  ) : null;
};

export default DetailCardHeadingsMaybe;
