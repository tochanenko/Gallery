import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import { useContext } from "react";
import { HeaderContext } from "../../store/header-context";

export default function HeaderLogo() {
  const { handleHideMobile } = useContext(HeaderContext);

  return <div className={classes.header__logo}>
    <Link to="/" onClick={handleHideMobile}>VPhotos_</Link>
  </div>
}