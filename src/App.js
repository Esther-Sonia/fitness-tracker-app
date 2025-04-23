import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import AppRoutes from './Router';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg bg-blue-400">
      <Navbar />
      <main className="container mx-auto p-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;