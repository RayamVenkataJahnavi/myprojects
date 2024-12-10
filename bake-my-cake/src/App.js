import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSection from './components/Herosection/Herosection';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import OrderForm from './components/OrderForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App = () => {
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category); // Set the category filter to the selected category
  };

  return (
    <Router>
      <div className="App">
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          {/* Render Header here once */}
          <Header onCategoryClick={handleCategoryChange} />
          {/* Pass the categoryFilter to HeroSection */}
          <HeroSection categoryFilter={categoryFilter} />
        </ErrorBoundary>

        {/* Setup Routes */}
        <Routes>
        <Route path="/order/:id" element={<OrderForm />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
