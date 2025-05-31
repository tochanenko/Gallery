import { useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { MODE_AUTO, THEME_DAY, themeActions } from '../../store/theme.js';
import { Link } from 'react-router-dom';

import Dropdown from '../UI/Dropdown/Dropdown';
import nightIcon from '../../assets/images/night_mode_24dp.svg';
import dayIcon from '../../assets/images/day_mode_24dp.svg';
import autoIcon from '../../assets/images/automatic_mode_24dp.svg';
import keyboardIconDown from '../../assets/images/keyboard_arrow_down_48dp.svg';
import classes from './Header.module.scss';
import { CATEGORIES } from '../../lib/constants';

export default function Header() {
  const themeState = useSelector(state => state.theme);
  const [hidden, setHidden] = useState(false);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const dispatch = useDispatch();
  const { scrollY } = useScroll();
  const headerShadow = useTransform(scrollY, [0, 100], ["var(--card-shadow-flat)", "var(--card-shadow)"]);
  const lastScrollY = useRef(0);

  const themeIcon = themeState.mode === MODE_AUTO
    ? autoIcon
    : themeState.theme === THEME_DAY
      ? dayIcon
      : nightIcon;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && lastScrollY.current > 100) {
      setHidden(true);
      setMobileHeaderVisible(false);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  function handleSelectTheme(newTheme) {
    if (newTheme === "Auto") {
      dispatch(themeActions.setAutoMode());
    } else if (newTheme === "Night") {
      dispatch(themeActions.setNightTheme());
    } else if (newTheme === "Day") {
      dispatch(themeActions.setDayTheme());
    }
  }

  function handleToggleMobileHeaderVisibility() {
    setMobileHeaderVisible(prevValue => !prevValue);
  }

  function handleResetMobileHeaderVisibility() {
    setMobileHeaderVisible(false);
  }

  const headerLogo = <div className={classes.header__logo}>
    <Link to="/" onClick={handleResetMobileHeaderVisibility}>VPhotos_</Link>
  </div>;

  const headerContent = <>
    <div className={classes.header__categories}>
      <ul>
        {CATEGORIES.map(category => <Link
          key={category.id}
          to={`/category/${category.id}`}
          onClick={handleResetMobileHeaderVisibility}
        ><li>{category.name}</li></Link>)}
      </ul>
    </div>

    <Dropdown
      className={classes.header__theme}
      choises={["Day", "Night", "Auto"]}
      handleSelect={handleSelectTheme}
      position={mobileHeaderVisible ? 'left' : 'right'}
    ><img src={themeIcon} alt="Theme chaning button" /></Dropdown>
  </>;

  const mobileHeader = (
    <div
      className={classes['header__nav--mobile__content']}
      onClick={handleToggleMobileHeaderVisibility}>
      <motion.img
        src={keyboardIconDown}
        animate={{ transform: `rotate(${mobileHeaderVisible ? 180 : 0}deg)` }}
      />
    </div>
  );

  return <motion.div
    className={`container ${classes.header}`}
    animate={{ y: hidden ? '-100%' : '0' }}
    transition={{ duration: 0.3 }}
    style={{ x: '-50%' }}
  >
    <motion.header
      initial={{ y: 0 }}
      style={{ boxShadow: headerShadow }}
      transition={{ duration: 0.3 }}
      className={classes.header__nav}
    >
      <div className={classes['header__nav--desktop']}>
        {headerLogo}
        {headerContent}
      </div>

      <div className={classes['header__nav--mobile']}>
        {headerLogo}
        {mobileHeader}
      </div>

      <div className={`${classes['header__nav--popup']} ${!mobileHeaderVisible ? classes.gone : undefined}`}>
        {headerContent}
      </div>
    </motion.header>

  </motion.div >;
}