import { useDispatch, useSelector } from "react-redux";
import { MODE_AUTO, THEME_DAY, themeActions } from "../../store/theme";

import Dropdown from '../UI/Dropdown/Dropdown';
import nightIcon from '../../assets/images/night_mode_24dp.svg';
import dayIcon from '../../assets/images/day_mode_24dp.svg';
import autoIcon from '../../assets/images/automatic_mode_24dp.svg';
import { CATEGORIES } from "../../lib/constants";

import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { HeaderContext } from "../../store/header-context";

export default function HeaderContent() {
  const { mobileVisible, handleHideMobile } = useContext(HeaderContext);
  const themeState = useSelector(state => state.theme);
  const dispatch = useDispatch();

  function handleSelectTheme(newTheme) {
    if (newTheme === "Auto") {
      dispatch(themeActions.setAutoMode());
    } else if (newTheme === "Night") {
      dispatch(themeActions.setNightTheme());
    } else if (newTheme === "Day") {
      dispatch(themeActions.setDayTheme());
    }
  }

  const themeIcon = themeState.mode === MODE_AUTO
    ? autoIcon
    : themeState.theme === THEME_DAY
      ? dayIcon
      : nightIcon;

  return <>
    <div className={classes.header__categories}>
      <ul>
        {CATEGORIES.map(category => <Link
          key={category.id}
          to={`/category/${category.id}`}
          onClick={handleHideMobile}
        ><li>{category.name}</li></Link>)}
      </ul>
    </div>

    <Dropdown
      className={classes.header__theme}
      choises={["Day", "Night", "Auto"]}
      handleSelect={handleSelectTheme}
      position={mobileVisible ? 'left' : 'right'}
    ><img src={themeIcon} alt="Theme chaning button" /></Dropdown>
  </>;
}