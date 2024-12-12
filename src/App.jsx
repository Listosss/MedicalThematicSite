import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { AppOutlet } from './components/Outlet/AppOutlet';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AboutUsPage } from './pages/AboutUsPage/AboutUsPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { NewsPage } from './pages/NewsPage/NewsPage';
import { SearchResultPage } from './pages/SearchResultPage/SearchResultPage';
import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';




const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash)
      window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
};

function App() {
  useScrollToTop()
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AppOutlet />}>
          <Route index element={<MainPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/article/:uid' element={<ArticlePage />} />
          <Route path='/search' element={<SearchResultPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
