import React, { Component } from 'react';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';
import config from '../../config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import css from '../SectionLocations/SectionLocations.css';

import beauty from '../../categoryImages/Beauty.jpg'

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}

const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, searchQuery) => {

  function importAll(r) {
    return r.keys().map(r);
  }


  const images = importAll(require.context('../../categoryImages/', false, /\.(png|jpe?g|svg)$/));

  let imgUrl=null;
  for(var key in images){
    console.log('key',key)
    var matchingKey = images[key].indexOf(name) !== -1;
    console.log('match',matchingKey)
    if(matchingKey){
      imgUrl=images[key];
    }

  }
  console.log('images',images[1])

  const nameText =  <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink  className={css.location} name="SearchPage" to={{ search: searchQuery }}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={imgUrl} alt={name} className={css.locationImage} />

        </div>
      </div>
      <div className={css.linkText}>
        {nameText}
      </div>
    </NamedLink>
  );
};

export class TypesOfInfluencers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.categories);
    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName, className);

    const listItems = this.props.categories.map((link,index) =>

        locationLink (link.key, 'pub_category=' + link.label)

    );

    return (
      <div className={classes}>
        <div>
          Types Of Influencers
        </div>
        <div className={css.locations}>


          {listItems}
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {};
};

TypesOfInfluencers.defaultProps = {
  categories: config.custom.categories,
};

const Types = compose(
  withRouter,
  connect(
    mapStateToProps,
  ),
  injectIntl,
)(TypesOfInfluencers);

export default Types;
