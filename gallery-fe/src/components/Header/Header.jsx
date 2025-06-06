import { useContext, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';

import classes from './Header.module.scss';
import HeaderContent from './HeaderContent.jsx';
import HeaderLogo from './HeaderLogo.jsx';
import HeaderMobile from './HeaderMobile';
import { HeaderContext } from '../../store/header-context';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const { mobileVisible, handleHideMobile } = useContext(HeaderContext);

  const { scrollY } = useScroll();
  const headerShadow = useTransform(scrollY, [0, 100], ["rgba(100, 100, 111, 0.0) 0 0 0", "rgba(100, 100, 111, 0.2) 0px 7px 29px"]);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && lastScrollY.current > 100) {
      setHidden(true);
      handleHideMobile();
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

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
        <HeaderLogo />
        <HeaderContent />
      </div>

      <div className={classes['header__nav--mobile']}>
        <HeaderLogo />
        <HeaderMobile />
      </div>

      <div className={`${classes['header__nav--popup']} ${!mobileVisible ? classes.gone : undefined}`}>
        <HeaderContent />
      </div>
    </motion.header>

  </motion.div >;
}
