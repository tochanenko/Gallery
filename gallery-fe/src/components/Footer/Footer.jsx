import { Link } from "react-router-dom";
import classes from "./Footer.module.scss";

import { VERSION } from "../../lib/constants";

export default function Footer() {
  return <footer>
    <div className="container">
      <div className={classes.footer}>
        <div className={classes.footer__info}>
          <p className={classes.footer__info__copyright}>&copy; Vladyslav Tochanenko &#x2022; {new Date().getFullYear()}</p>
          <p className={classes.footer__info__version}>
            <Link className={classes.footer__info__version__link} to="/updates">{VERSION}</Link> &#x2022; <Link className={classes.footer__info__version__link} to="/policy">Privacy Policy & Terms of Use</Link>
          </p>
        </div>
        <div className={classes.footer__links}>
          <p className={classes.footer__links__title}>Links</p>
          <ul className={classes.footer__links__list}>
            <a href="https://www.instagram.com/v.tochanenko" target="_blank"><li>Instagram</li></a>
            <a href="https://github.com/tochanenko" target="_blank"><li>GitHub</li></a>
            <a href="https://www.linkedin.com/in/tochanenko/" target="_blank"><li>LinkedIn</li></a>
          </ul>
        </div>
        <div className={classes.footer__links}>
          <p className={classes.footer__links__title}>Contact</p>
          <ul className={classes.footer__links__list}>
            <a href="mailto:mail@tochanenko.com"><li>E-Mail</li></a>
          </ul>
        </div>
      </div>
    </div>
  </footer>
}