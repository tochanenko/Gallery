import { Outlet, ScrollRestoration, useLocation, useNavigationType } from 'react-router-dom';
import classes from './MainContainer.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import HeaderContextProvider from '../../store/header-context';
import PageProgress from '../UI/PageProgress/PageProgress';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { useEffect, useState } from 'react';
import { errorActions } from '../../store/error';

export default function MainContainer() {
  const { isError } = useSelector(state => state.error);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigationType = useNavigationType();
  const [nav, setNav] = useState(0);

  useEffect(() => {
    setNav(prev => prev + 1);
  }, [location.key, navigationType]);

  useEffect(() => {
    if (isError) dispatch(errorActions.unsetError());
  }, [nav, dispatch]);

  return <>
    <PageProgress />
    <HeaderContextProvider>
      <Header />
      <main className={classes['main-container']}>
        <ScrollRestoration />
        {!isError ? <Outlet /> : <div className="container"><ErrorComponent /></div>}
      </main>
      <Footer />
    </HeaderContextProvider>
  </>
}