import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    metadata,
    rating,
  } = props;

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
      ? 'ListingPage.perDay'
      : 'ListingPage.perUnit';

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

  function getrating(rating) {
    switch (rating) {
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
          starts.push(star);
        }

        return <span>{starts}</span>;
      }
        break;
    }

  }

  return (
    <div className={css.sectionHeading}>
      {/*<div className={css.desktopPriceContainer}>*/}
      {/*  <div className={css.desktopPriceValue} title={priceTitle}>*/}
      {/*    {formattedPrice}*/}
      {/*  </div>*/}
      {/*  <div className={css.desktopPerUnit}>*/}
      {/*    <FormattedMessage id={unitTranslationKey} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={css.heading}>

        <h1 className={css.title}>
          <span className={css.titleSpm}>{richTitle}</span>
          {metadata && metadata.featured ? (
            <span className={css.ListingPage__featured}><span>PREMIUM</span></span>

          ) : null
          }
        </h1>

        <div className={css.author}>
          {category}
          <div className={css.rating_root}>
            <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }}/>
            <div className={css.rating}>
              {getrating(rating)}
            </div>
          </div>
          {showContactUser ? (


            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton rootClassName={css.contactLink} onClick={onContactUser}>
                <FormattedMessage id="ListingPage.contactUser"/>
              </InlineTextButton>

            </span>


          ) : null}

        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
