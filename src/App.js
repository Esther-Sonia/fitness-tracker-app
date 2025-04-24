import React from 'react';
import Navbar from './Components/Navbar';
import AppRoutes from './Router';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;