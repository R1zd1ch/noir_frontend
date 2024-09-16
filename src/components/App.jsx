import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './Root';
import MainPage from './MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route index></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route></Route>
          <Route path="*"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
