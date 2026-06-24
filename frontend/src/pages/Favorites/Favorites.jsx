import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFavorites } from '../../context/FavoritesContext'
import CollegeCard from '../../components/CollegeCard/CollegeCard'
import './Favorites.css'

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites()

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all colleges from your favorites?')) {
      clearFavorites()
    }
  }

  return (
    <div className="favorites-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Your Favorite Colleges</h1>
            <p>
              {favorites.length > 0 
                ? `You have saved ${favorites.length} college${favorites.length > 1 ? 's' : ''} for future reference`
                : 'You haven\'t saved any colleges yet'
              }
            </p>
          </div>
          {favorites.length > 0 && (
            <div className="header-actions">
              <button onClick={handleClearAll} className="btn btn-secondary">
                Clear All
              </button>
              <Link to="/compare" className="btn btn-primary">
                Compare Selected
              </Link>
            </div>
          )}
        </div>

        {/* Favorites Content */}
        {favorites.length > 0 ? (
          <motion.div
            className="favorites-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {favorites.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CollegeCard college={college} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h2>No Favorite Colleges Yet</h2>
            <p>
              Start exploring colleges and save your preferred options to easily compare 
              and review them later. Your favorites will appear here.
            </p>
            <div className="empty-actions">
              <Link to="/predict" className="btn btn-primary">
                Find Colleges
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites