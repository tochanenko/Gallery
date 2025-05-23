import { Outlet } from 'react-router-dom';
import classes from './MainContainer.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function MainContainer() {
  return <>
    <Header />
    <main className={classes['main-container']}>
      <Outlet />
    </main>
    <Footer />
  </>
}