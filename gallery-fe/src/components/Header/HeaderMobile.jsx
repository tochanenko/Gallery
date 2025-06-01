import { motion } from "motion/react";
import classes from "./Header.module.scss";

import keyboardIconDown from '../../assets/images/keyboard_arrow_down_48dp.svg';
import { useContext } from "react";
import { HeaderContext } from "../../store/header-context";

export default function HeaderMobile() {
  const { mobileVisible, handleToggleMobile } = useContext(HeaderContext);

  return <div
    className={classes['header__nav--mobile__content']}
    onClick={handleToggleMobile}>
    <motion.img
      src={keyboardIconDown}
      animate={{ transform: `rotate(${mobileVisible ? 180 : 0}deg)` }}
    />
  </div>;
}