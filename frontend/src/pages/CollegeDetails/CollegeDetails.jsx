import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFavorites } from '../../context/FavoritesContext'
import { mockColleges } from '../../data/mockData'
import './CollegeDetails.css'

const CollegeDetails = () => {
  const { id } = useParams()
  const college = mockColleges.find(c => c.id === id)
  
  const {
    addToFavorites,
    removeFromFavorites,
    addToCompare,
    removeFromCompare,
    isFavorite,
    isInCompare,
    canAddToCompare
  } = useFavorites()

  if (!college) {
    return (
      <div className="college-details-page">
        <div className="container">
          <div className="not-found">
            <h1>College Not Found</h1>
            <p>The college you're looking for doesn't exist.</p>
            <Link to="/results" className="btn btn-primary">
              Back to Results
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(college.id)) {
      removeFromFavorites(college.id)
    } else {
      addToFavorites(college)
    }
  }

  const handleCompareToggle = () => {
    if (isInCompare(college.id)) {
      removeFromCompare(college.id)
    } else if (canAddToCompare()) {
      addToCompare(college)
    }
  }

  return (
    <div className="college-details-page">
      <div className="container">
        {/* College Header */}
        <motion.div
          className="college-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="college-logo">
            <img 
              src={college.logo} 
              alt={`${college.shortName} logo`}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="logo-placeholder" style={{display: 'none'}}>
              {college.shortName.charAt(0)}
            </div>
          </div>
          <div className="college-info">
            <h1>{college.name}</h1>
            <p className="college-location">{college.location.city}, {college.state}</p>
            <p className="college-type">{college.type} • Established {college.established}</p>
            <p className="college-description">{college.description}</p>
          </div>
          <div className="college-actions">
            <button
              onClick={handleFavoriteToggle}
              className={`action-btn favorite-btn ${isFavorite(college.id) ? 'active' : ''}`}
            >
              ❤️ {isFavorite(college.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button
              onClick={handleCompareToggle}
              className={`action-btn compare-btn ${isInCompare(college.id) ? 'active' : ''}`}
              disabled={!canAddToCompare() && !isInCompare(college.id)}
            >
              ⚖️ {isInCompare(college.id) ? 'Remove from Compare' : 'Add to Compare'}
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="quick-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">#{college.ranking.nirf}</div>
              <div className="stat-label">NIRF Ranking</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-value">₹{(college.placement.averagePackage / 100000).toFixed(1)}L</div>
              <div className="stat-label">Average Package</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-value">{college.placement.placementRate}%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💵</div>
            <div className="stat-content">
              <div className="stat-value">₹{(college.fees.total / 100000).toFixed(1)}L</div>
              <div className="stat-label">Total Annual Fee</div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Information */}
        <div className="details-content">
          <motion.div
            className="details-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>College Highlights</h2>
            <ul className="highlights-list">
              {college.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="details-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Facilities</h2>
            <div className="facilities-grid">
              {college.facilities.map((facility, index) => (
                <div key={index} className="facility-item">
                  <span className="facility-icon">✓</span>
                  {facility}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="details-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2>Top Recruiters</h2>
            <div className="recruiters-grid">
              {college.placement.topRecruiters.map((recruiter, index) => (
                <div key={index} className="recruiter-item">
                  {recruiter}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <div className="back-actions">
          <Link to="/results" className="btn btn-secondary">
            ← Back to Results
          </Link>
          <a 
            href={college.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Official Website →
          </a>
        </div>
      </div>
    </div>
  )
}

export default CollegeDetails