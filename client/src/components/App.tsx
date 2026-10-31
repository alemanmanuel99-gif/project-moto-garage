import { Navigate, Route, Routes } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
