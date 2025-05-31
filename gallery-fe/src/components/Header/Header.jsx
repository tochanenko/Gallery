import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

import instagramLogo from '../../assets/images/icons8-instagram-24.svg';
import keyboardIconDown from '../../assets/images/keyboard_arrow_down_48dp.svg';
import { useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

import { themeActions, DAY_THEME } from '../../store/theme.js';

import { CATEGORIES } from '../../lib/constants';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  function handleThemeChange() {
    dispatch(themeActions.changeTheme());
  }

  const { scrollY } = useScroll();

  const headerShadow = useTransform(scrollY, [0, 100], ["var(--card-shadow-flat)", "var(--card-shadow)"]);

  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && lastScrollY.current > 100) {
      setHidden(true);
      setMobileHeaderVisible(false);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

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
    <motion.img src={keyboardIconDown} animate={{ transform: `rotate(${mobileHeaderVisible ? 180 : 0}deg)` }} />
  </div>;

  function handleToggleMobileHeaderVisibility() {
    setMobileHeaderVisible(prevValue => !prevValue);
  }

  function handleResetMobileHeaderVisibility() {
    setMobileHeaderVisible(false);
  }

  return <motion.div
    className={`container ${classes.header_container}`}
    animate={{ y: hidden ? '-100%' : '0' }}
    transition={{ duration: 0.3 }}
    style={{ x: '-50%' }}
  >
    <motion.header
      initial={{ y: 0 }}
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
  </motion.div >;
}