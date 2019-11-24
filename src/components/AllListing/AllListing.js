import css from '../SectionLocations/SectionLocations.css';
import helsinkiImage from '../SectionLocations/images/location_helsinki.jpg';
import React from 'react';
import { NamedLink } from '../index';

const AllListing = props => {

  return (
    <div>
      {locationLink(
        'All',
        helsinkiImage,
        's',
      )}
    </div>
  );
};


const locationLink = (name, image, searchQuery) => {

  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>

      <div>
        Browse Influencers ggg
      </div>
    </NamedLink>
  );
};

export default AllListing;
