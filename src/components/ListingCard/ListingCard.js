import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage } from '../../components';

import css from './ListingCard.css';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency },
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency },
      ),
    };
  }
  return {};
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}

const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const { className, rootClassName, intl, listing, renderSizes, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingCard.perNight'
    : isDaily
      ? 'ListingCard.perDay'
      : 'ListingCard.perUnit';
  console.log('props', props);

  const filledStar = (<svg
    className={css.fill_star}
    viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.938 8.008c-.15-.412-.544-.69-.985-.69H14.38L12.507.758C12.377.31 11.967 0 11.5 0c-.467 0-.88.31-1.006.76L8.618 7.317H1.046c-.442 0-.833.278-.983.69-.15.414-.025.876.314 1.16l5.7 4.75L3.2 21.59c-.16.43-.02.916.346 1.196.362.28.87.29 1.242.02l6.71-4.79 6.713 4.79c.375.27.88.26 1.245-.02.366-.28.504-.765.343-1.196l-2.875-7.67 5.7-4.75c.34-.284.463-.746.315-1.16"
      fill-rule="evenodd"></path>
  </svg>);

  const star = (<svg
    className={css.star}
    viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.938 8.008c-.15-.412-.544-.69-.985-.69H14.38L12.507.758C12.377.31 11.967 0 11.5 0c-.467 0-.88.31-1.006.76L8.618 7.317H1.046c-.442 0-.833.278-.983.69-.15.414-.025.876.314 1.16l5.7 4.75L3.2 21.59c-.16.43-.02.916.346 1.196.362.28.87.29 1.242.02l6.71-4.79 6.713 4.79c.375.27.88.26 1.245-.02.366-.28.504-.765.343-1.196l-2.875-7.67 5.7-4.75c.34-.284.463-.746.315-1.16"
      fill-rule="evenodd"></path>
  </svg>);


  function rating() {
    switch (Math.round(props.listing.attributes.metadata.rating)) {
      case 1: {
        var starts = [];
        for (var i = 0; i < 1; i++) {
          starts.push(filledStar);
        }
        for (var j = 0; j < 4; j++) {
          starts.push(star);
        }
        return <span>{starts}</span>;
      }
        break;
      case 2: {
        var starts = [];
        for (var i = 0; i < 2; i++) {
          starts.push(filledStar);
        }
        for (var j = 0; j < 3; j++) {
          starts.push(star);
        }
        return <span>{starts}</span>;
      }
        break;
      case 3: {
        var starts = [];
        for (var i = 0; i < 3; i++) {
          starts.push(filledStar);
        }
        for (var j = 0; j < 2; j++) {
          starts.push(star);
        }
        return <span>{starts}</span>;
      }
        break;
      case 4: {
        var starts = [];
        for (var i = 0; i < 4; i++) {
          starts.push(filledStar);
        }
        for (var j = 0; j < 1; j++) {
          starts.push(star);
        }
        return <span>{starts}</span>;
      }
        break;
      case 5: {
        var starts = [];
        for (var i = 0; i < 5; i++) {
          starts.push(filledStar);
        }

        return <span>{starts}</span>;
      }
        break;
      case 6: {
        var starts = [];
        for (var i = 0; i < 5; i++) {
          starts.push(filledStar);
        }

        return <span>{starts}</span>;
      }
        break;
    }

  }

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.tags}>
          <div className={css.tagRoot}>
            {listing.attributes.metadata['featured'] ?
              <span
                className={css.prmiumTag}><span>FEATURED</span></span> : null
            }
            {/*<span*/}
            {/*className={css.verifiedTag}><span>VERIFIED</span></span>*/}
          </div>
        </div>
        <div className={css.main}>
          <div className={css.price}>
            <div className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </div>
            <div className={css.perUnit}>
              <FormattedMessage id={unitTranslationKey}/>
            </div>
          </div>

          <div className={css.mainInfo}>
            <div className={css.title}>
              {richText(title, {
                longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                longWordClass: css.longWord,
              })}
            </div>
            <div className={css.rating_root}>
              <div className={css.rating}>
                {rating()}
              </div>
              <div className={css.authorInfo}>

                <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
