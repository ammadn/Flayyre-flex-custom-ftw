import React, { Component } from 'react';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';
import config from '../../config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';




const locationLink = (name, searchQuery) => {
  const nameText = <span>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }}>

      <div>
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

    const listItems = this.props.categories.map((link) =>
      <div key={link.key}>
        {locationLink(link.key, 'pub_category=' + link.label)}
      </div>,
    );

    return (
      <div className={classes}>
        <div>
          Types Of Influencers
        </div>
        <div>
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
