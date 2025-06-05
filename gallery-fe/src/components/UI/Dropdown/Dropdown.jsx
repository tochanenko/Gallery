import { useRef, useState } from "react";
import classes from "./Dropdown.module.scss";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';

export default function Dropdown({ choises, position = "right", className = "", handleSelect, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (lastScrollY.current !== latest) setIsOpen(false);
    lastScrollY.current = latest;
  });

  function handleDropdownVisibility() {
    setIsOpen(prevState => !prevState);
  }

  function handleChoiseClick(choise) {
    setIsOpen(false);
    handleSelect(choise);
  }

  return <div className={classes.dropdown}>
    <div className={`${classes.dropdown__trigger} ${className ?? ''}`} onClick={handleDropdownVisibility}>{children}</div>
    <AnimatePresence>
      {isOpen ? <motion.div
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: { height: 'auto', opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={`${classes.dropdown__content} ${classes['position_' + position]}`}
      >
        {choises.map(choise => <span
          key={choise}
          className={classes.dropdown__content__choise}
          onClick={() => handleChoiseClick(choise)}
        >{choise}</span>)}
      </motion.div> : undefined}
    </AnimatePresence>
  </div>;
}