import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  Page,
  SectionHowItWorks,
  SectionLocations,
} from '../../components';
import { TopbarContainer,SearchPage2 } from '../../containers';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './LandingPage.css';
import AllListing from '../../components/AllListing/AllListing';
import TypesOfInfluencers from '../../components/TypesOfInfluencers/TypesOfInfluencers';

import { fakeIntl } from '../../util/test-data';


export const LandingPageComponent = props => {
  const { history, intl, location, scrollingDisabled } = props;
  const noop = () => null;
  const props2 = {
    location: { search: '' },
    history: {
      push: () => console.log('HistoryPush called'),
    },
    pagination: {
      page: 1,
      perPage: 12,
      totalItems: 22,
      totalPages: 2,
    },
    tab: 'listings',
    scrollingDisabled: false,
    searchInProgress: false,
    authInProgress: false,
    currentUserHasListings: false,
    intl: fakeIntl,
    isAuthenticated: false,
    onActivateListing: noop,
    onLogout: noop,
    onManageDisableScrolling: noop,
    onSearchMapListings: noop,
    sendVerificationEmailInProgress: false,
    onResendVerificationEmail: noop,

  };

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer/>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          {/*<div className={css.heroContainer}>*/}
          {/*  <SectionHero className={css.hero} history={history} location={location}/>*/}
          {/*</div>*/}

          <ul className={css.sections}>

            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <AllListing/>
              </div>
            </li>

            {/*<li>*/}
            {/*  <div className={css.sectionContentFirstChild}>*/}
            {/*    <SectionLocations/>*/}
            {/*  </div>*/}
            {/*</li>*/}
            <li>
              <div className={css.sectionContentFirstChild}>
                <TypesOfInfluencers/>
              </div>
            </li>
            {/*<li className={css.section}>*/}
            {/*  <div className={css.sectionContent}>*/}
            {/*    <SectionHowItWorks/>*/}
            {/*  </div>*/}
            {/*</li>*/}

            <li>
              <div className={css.sectionContentFirstChild}>
                <SearchPage2 {...props}/>
              </div>
            </li>
          </ul>

        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer/>
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;


LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl,
)(LandingPageComponent);

export default LandingPage;
