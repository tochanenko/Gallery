import { Outlet, ScrollRestoration } from 'react-router-dom';
import classes from './MainContainer.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function MainContainer() {
  return <>
    <Header />
    <main className={classes['main-container']}>
      <ScrollRestoration />
      <Outlet />
    </main>
    <Footer />
  </>
}