import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './Affiliate.css';
import stepImage from '../../assets/iNFLUENCER SOCIAL MEDIA PROMO 1 (1).jpg';
import LogoImage from '../../assets/FlayyreLogoArialV.png';
import config from '../../config';


const Affiliate = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>

      <div>
        <div className={css.imgRoot}>
          <div className={css.bttn}>
            <a className={css.btn} target="https://forms.gle/rp5VpoQK4JQLs7P5A"
               href="https://forms.gle/rp5VpoQK4JQLs7P5A"><span className={css.txtBtn}>Get started</span></a>
          </div>
          <img className={css.stepImg} src={stepImage} alt={config.siteTitle}/>
        </div>

      </div>

      </div>
        );
        };

        Affiliate.defaultProps = {rootClassName: null, className: null};

        const {string} = PropTypes;

        Affiliate.propTypes = {
        rootClassName: string,
        className: string,
      };

        export default Affiliate;
