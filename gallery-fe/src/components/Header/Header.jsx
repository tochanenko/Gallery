import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const CATEGORIES = [
  'animals',
  'city',
  'mountains',
  'flowers_plants'
];

export default function Header() {
  return <header className={classes.header}>
    <div className={`container ${classes.header_container}`}>
      <div className={classes.logo}><Link to="/">VPhotos_</Link></div>
      <div className={classes.categories}>
        <ul>
          {CATEGORIES.map(category => <li key={category}><Link to={`/category/${category}`}>{category}</Link></li>)}
        </ul>
      </div>
      <div className={classes.social}>
        <ul>
          <li>Instagram</li>
        </ul>
      </div>
    </div>
  </header>;
}