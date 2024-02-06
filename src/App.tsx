import { useEffect } from 'react';
import Home from './pages/Home';
import './sass/base.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchTags } from './redux/quoteSlice';
import { useAppDispatch } from './hooks/reduxTypedHooks';
import { About, Header } from './components';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <About />
      <Header />
      <Home />
    </>
  );
}

export default App;
