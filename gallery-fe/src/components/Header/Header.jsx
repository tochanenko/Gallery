import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

import instagramLogo from '../../assets/images/icons8-instagram-24.svg';
import keyboardIconDown from '../../assets/images/keyboard_arrow_down_48dp.svg';
import { useState } from 'react';

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
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const headerLogo = <div className={classes.logo}><Link to="/">VPhotos_</Link></div>;

  const headerContent = <>
    <div className={classes.categories}>
      <ul>
        {CATEGORIES.map(category => <li key={category.id}><Link to={`/category/${category.id}`}>{category.name}</Link></li>)}
      </ul>
    </div>
    <div className={classes.social}>
      <ul>
        <li><img src={instagramLogo} /></li>
      </ul>
    </div>
  </>;

  const mobileHeader = <div className={classes.mobile_header} onClick={handleToggleMobileHeaderVisibility}>
    <img src={keyboardIconDown} style={{ transform: `rotate(${mobileHeaderVisible ? 180 : 0}deg)` }} />
  </div>;

  function handleToggleMobileHeaderVisibility() {
    console.log(mobileHeaderVisible);
    setMobileHeaderVisible(prevValue => !prevValue);
  }

  return <header className={classes.header}>
    <div className="container">

      <div className={classes.desktop_nav}>
        {headerLogo}
        {headerContent}
      </div>

      <div className={classes.mobile_nav}>
        {headerLogo}
        {mobileHeader}
      </div>

      <div className={classes.popup_header} style={{ display: mobileHeaderVisible ? 'block' : 'none' }}>
        {headerContent}
      </div>
    </div>

  </header>;
}