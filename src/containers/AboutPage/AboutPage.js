import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>ABOUT US</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div >
            <p className={css.paragraphJust}>Flayyre is a P2P marketplace platform for brands to find the right creators and influencers to promote their products and services.
            </p>
            <p className={css.paragraphJust}>
              Influencer marketing has created an authentic, people-centered approach that outperforms traditional advertising.
              This highly successful method draws traction from the digital footprints of creators who’ve built credibility and a dedicated following.
              A recommendation or endorsement from an influencer is a form of social proof, and creates instant points of entry to audiences and consumers.
              In other words, you’re meeting the consumer where they are.

            </p>
            <p className={css.paragraphJust}>
              Flayyre’s mission is to curate talent and creative solutions that deliver outstanding campaigns while also working to solve influencer monetization disparity.
              You’ll find the world’s biggest influencers on Flayyre, as well as extraordinary talent in niche markets with audiences from every walk of life.
              We’re dedicated to sharing diverse voices that pack a punch and creative dynamite. We don’t judge or overlook creators based on the size of their audience.
              We search for the users who have have a unique voice and the ability to generate awareness and positively impact your brand.
            </p>

            <h1 className={css.pageTitle}>Fees</h1>

            <p className={css.paragraphJust}>
            At Flayyre, we aim to create simplicity within the Influencer community. We do this by introducing products
              to the market that simplifies talent monetization. In order to create simplistic methods for Influencer monetization,
              we eliminated fees when using our platform and only charge Influencers 15% after a business has purchased their services. Businesses have a 0% fee.
            </p>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
