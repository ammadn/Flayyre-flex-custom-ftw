import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import helsinkiImage from './images/location_helsinki.jpg';
import rovaniemiImage from './images/location_rovaniemi.jpg';
import beauty from './images/BeautyCategoryImage.JPG';
import bussness from './images/BusinessCategory.jpeg';
import entertainment from './images/EntertainmentCategoryImage.jpeg';
import fashion from './images/FashionCatImage.jpeg';
import fitness from './images/FitnessCategoryImage.jpeg';
import food from './images/FoodCategoryImage.jpeg';
import gamming from './images/GamingCategoryImage.jpeg';
import lifeStyle from './images/Lifestylecatimage.jpeg';
import travel from './images/TravelCategoryImage.jpeg';



class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  console.log("name text",nameText)
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.linkText}>
        {name}
      </div>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>

    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Beauty',
          entertainment,
          '??address=Media&pub_category=Media'
        )}
        {locationLink(
          'Fashion',
          fitness,
          '?address=Fitness&pub_category=Fitness'
        )}
        {locationLink(
          'Lifestyle',
          travel,
          '??address=Travel&pub_category=Travel'
        )}


      </div>
      <div className={css.locations}>
        {locationLink(
          'Beauty',
          beauty,
          '??address=Beauty&pub_category=Beauty'
        )}
        {locationLink(
          'Fashion',
          fashion,
          '?pub_category=Fashion'
        )}
        {locationLink(
          'Lifestyle',
          food,
          '??address=Food&pub_category=Food'
        )}

      </div>
      <div className={css.locations}>
        {locationLink(
          'Beauty',
          lifeStyle,
          '??address=Lifestyle&pub_category=Lifestyle'
        )}
        {locationLink(
          'Fashion',
          gamming,
          '?address=Gaming&pub_category=Gaming'
        )}
        {locationLink(
          'Lifestyle',
          bussness,
          '??address=Business&pub_category=Business'
        )}


      </div>

      {/*<div className={css.createsearchpagelink}>*/}
      {/*  <NamedLink name="SearchPage">*/}
      {/*    <FormattedMessage id="SectionLocation.createsearchpageLink" />*/}
      {/*  </NamedLink>*/}
      {/*</div>*/}
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;

