import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '../../context/FavoritesContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { favorites, compareList } = useFavorites()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/predict', label: 'Predict Colleges' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const dashboardItems = [
    { path: '/favorites', label: 'Favorites', count: favorites.length },
    { path: '/compare', label: 'Compare', count: compareList.length }
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>🎓</span>
            </div>
            <div className="logo-text">
              <h1>Smart College</h1>
              <span>Recommendation System</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links desktop-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* Dashboard Dropdown */}
            <li className="dropdown">
              <button className="nav-link dropdown-toggle">
                Dashboard
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>
              <ul className="dropdown-menu">
                {dashboardItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="dropdown-link">
                      {item.label}
                      {item.count !== undefined && (
                        <span className="count-badge">{item.count}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="header-cta desktop-nav">
            <button
              onClick={() => navigate('/predict')}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-nav-links">
                {navItems.map((item) => (
                  <motion.li
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                
                {/* Mobile Dashboard Links */}
                <motion.li
                  className="mobile-dashboard-section"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mobile-section-title">Dashboard</div>
                  {dashboardItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="mobile-nav-link dashboard-link"
                    >
                      {item.label}
                      {item.count !== undefined && (
                        <span className="count-badge">{item.count}</span>
                      )}
                    </Link>
                  ))}
                </motion.li>

                {/* Mobile CTA */}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => navigate('/predict')}
                    className="btn btn-primary mobile-cta"
                  >
                    Get Started
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header