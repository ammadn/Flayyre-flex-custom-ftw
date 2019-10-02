import * as custom from './marketplace-custom-config.js';
import defaultLocationSearches from './default-location-searches';
import { stripePublishableKey, stripeSupportedCountries } from './stripe-config';
import { currencyConfiguration } from './currency-config';

const env = process.env.REACT_APP_ENV;
const dev = process.env.REACT_APP_ENV === 'development';

// If you want to change the language, remember to also change the
// locale data and the messages in the app.js file.
const locale = 'en';
const i18n = {
  /*
    0: Sunday
    1: Monday
    ...
    6: Saturday
  */
  firstDayOfWeek: 0,
};

// Should search results be ordered by distance to origin.
// NOTE: If this is set to true add parameter 'origin' to every location in default-location-searches.js
// Without the 'origin' parameter, search will not work correctly
// NOTE: Keyword search and ordering search results by distance can't be used at the same time. You can turn keyword
// search off by changing the keywordFilterConfig parameter active to false in marketplace-custom-config.js
const sortSearchByDistance = false;

// API supports custom processes to be used in booking process.
// We need to specify it when we are initiating a new order
// (or fetching price information by calling 'initiateSpeculative' endpoint).
//
// In a way, 'processAlias' defines which transaction process (or processes)
// this particular web application is able to handle.
const bookingProcessAlias = 'sca-preauth-nightly-booking/release-1';

const bookingProcessAlias2 = 'sca-negotiated-nightly-booking/release-1';


// The transaction line item code for the main unit type in bookings.
//
// Possible values: ['line-item/night', 'line-item/day', 'line-item/units';]
//
// Note: translations will use different translation keys for night, day or unit
// depending on the value chosen.
const bookingUnitType = 'line-item/night';

// Should the application fetch available time slots (currently defined as
// start and end dates) to be shown on listing page.
const enableAvailability = process.env.REACT_APP_AVAILABILITY_ENABLED === 'true';

// A maximum number of days forwards during which a booking can be made.
// This is limited due to Stripe holding funds up to 90 days from the
// moment they are charged. Also note that available time slots can only
// be fetched for 180 days in the future.
const dayCountAvailableForBooking = 90;

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const sdkTransitVerbose = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';

const currency = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY;

// Currency formatting options.
// See: https://github.com/yahoo/react-intl/wiki/API#formatnumber
const currencyConfig = currencyConfiguration(currency);

// Listing minimum price in currency sub units, e.g. cents.
// 0 means no restriction to the price
const listingMinimumPriceSubUnits = 0;

// Sentry DSN (Data Source Name), a client key for authenticating calls to Sentry
const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

// If webapp is using SSL (i.e. it's behind 'https' protocol)
const usingSSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

// Address information is used in SEO schema for Organization (http://schema.org/PostalAddress)
const addressCountry = 'FI';
const addressRegion = 'Helsinki';
const postalCode = '00100';
const streetAddress = 'Bulevardi 14';

// Canonical root url is needed in social media sharing and SEO optimization purposes.
const canonicalRootURL = process.env.REACT_APP_CANONICAL_ROOT_URL;

// Site title is needed in meta tags (bots and social media sharing reads those)
const siteTitle = 'Saunatime';

// Twitter handle is needed in meta tags (twitter:site). Start it with '@' character
const siteTwitterHandle = '@sharetribe';

// Instagram page is used in SEO schema (http://schema.org/Organization)
const siteInstagramPage = null;

// Facebook page is used in SEO schema (http://schema.org/Organization)
const siteFacebookPage = 'https://www.facebook.com/Sharetribe/';

// Facebook counts shares with app or page associated by this id
// Currently it is unset, but you can read more about fb:app_id from
// https://developers.facebook.com/docs/sharing/webmasters#basic
// You should create one to track social sharing in Facebook
const facebookAppId = null;



// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  locale,
  bookingProcessAlias,
  bookingUnitType,
  enableAvailability,
  dayCountAvailableForBooking,
  i18n,
  sdk: {
    clientId: sdkClientId,
    baseUrl: sdkBaseUrl,
    transitVerbose: sdkTransitVerbose,
  },
  sortSearchByDistance,
  currency,
  currencyConfig,
  listingMinimumPriceSubUnits,
  stripe: {
    publishableKey: stripePublishableKey,
    supportedCountries: stripeSupportedCountries,
  },
  canonicalRootURL,
  address: {
    addressCountry,
    addressRegion,
    postalCode,
    streetAddress,
  },
  siteTitle,
  siteFacebookPage,
  siteInstagramPage,
  siteTwitterHandle,
  facebookAppId,
  sentryDsn,
  usingSSL,
  custom,
};

export default config;
