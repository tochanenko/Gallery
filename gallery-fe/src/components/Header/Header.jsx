import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

import instagramLogo from '../../assets/images/icons8-instagram-24.svg';
import keyboardIconDown from '../../assets/images/keyboard_arrow_down_48dp.svg';
import { useState } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

import { themeActions, DAY_THEME } from '../../store/theme.js';

const CATEGORIES = [
  {
    name: 'Animals',
    id: 'animals'
  },
  {
    name: 'City',
    id: 'city'
  },
  {
    name: 'Mountains',
    id: 'mountains'
  },
  {
    name: 'Flowers',
    id: 'flowers_plants'
  },
]

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  function handleThemeChange() {
    dispatch(themeActions.changeTheme());
  }

  const { scrollY } = useScroll();

  const headerShadow = useTransform(scrollY, [0, 100], ["var(--card-shadow-flat)", "var(--card-shadow)"]);

  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const headerLogo = <div className={classes.logo}><Link to="/" onClick={handleResetMobileHeaderVisibility}>VPhotos_</Link></div>;

  const headerContent = <>
    <div className={classes.categories}>
      <ul>
        {CATEGORIES.map(category => <Link to={`/category/${category.id}`} onClick={handleResetMobileHeaderVisibility} key={category.id}><li>{category.name}</li></Link>)}
      </ul>
    </div>
    <div className={classes.social}>
      <ul>
        {/* TODO Add Instagram Logo <li onClick={handleThemeChange}><img src={instagramLogo} /></li> */}
        <li onClick={handleThemeChange}>T</li>
      </ul>
    </div>
  </>;

  const mobileHeader = <div className={classes.mobile_header} onClick={handleToggleMobileHeaderVisibility}>
    <img src={keyboardIconDown} style={{ transform: `rotate(${mobileHeaderVisible ? 180 : 0}deg)` }} />
  </div>;

  function handleToggleMobileHeaderVisibility() {
    setMobileHeaderVisible(prevValue => !prevValue);
  }

  function handleResetMobileHeaderVisibility() {
    setMobileHeaderVisible(false);
  }

  return <div className={`container ${classes.header_container}`}>
    <motion.header
      style={{ boxShadow: headerShadow }}
      transition={{ duration: 0.3 }}
      className={classes.header}
    >
      <div className={classes.desktop_nav}>
        {headerLogo}
        {headerContent}
      </div>

      <div className={classes.mobile_nav}>
        {headerLogo}
        {mobileHeader}
      </div>

      <div className={`${classes.popup_header} ${!mobileHeaderVisible ? classes.gone : undefined}`}>
        {headerContent}
      </div>
    </motion.header>
  </div >;
}