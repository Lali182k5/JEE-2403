import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// Pages
import Home from './pages/Home/Home'
import Predict from './pages/Predict/Predict'
import Results from './pages/Results/Results'
import CollegeDetails from './pages/CollegeDetails/CollegeDetails'
import Compare from './pages/Compare/Compare'
import Favorites from './pages/Favorites/Favorites'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

// Context
import { PredictionProvider } from './context/PredictionContext'
import { FavoritesProvider } from './context/FavoritesContext'

import './styles/App.css'

function App() {
  return (
    <PredictionProvider>
      <FavoritesProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/results" element={<Results />} />
                <Route path="/college/:id" element={<CollegeDetails />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </PredictionProvider>
  )
}

export default App