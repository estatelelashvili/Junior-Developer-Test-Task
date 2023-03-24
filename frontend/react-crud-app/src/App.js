import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/addproduct' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
