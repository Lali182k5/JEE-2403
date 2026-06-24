import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import './CollegeCard.css'

const CollegeCard = ({ college }) => {
  // defensive guard
  if (!college) return null

  const {
    id = 'unknown',
    name = '',
    shortName = '',
    branch = '',
    shortBranch = '',
    type = college.institutionType || college.type || '',
    institutionType = college.institutionType || college.type || '',
    state = '',
    region = '',
    matchPercentage = 0,
    appliedCutoff = null,
    eligibilityStatus = 'Not Eligible',
    admissionChance = '',
  } = college

  const {
    addToFavorites,
    removeFromFavorites,
    addToCompare,
    removeFromCompare,
    isFavorite,
    isInCompare,
    compareList
  } = useFavorites()

  const fav = isFavorite(id)
  const inCompare = isInCompare(id)

  const handleFavoriteToggle = (e) => {
    e.preventDefault()
    if (fav) removeFromFavorites(id)
    else addToFavorites({ ...college, id })
  }

  const handleCompareToggle = (e) => {
    e.preventDefault()
    if (inCompare) removeFromCompare(id)
    else addToCompare({ ...college, id })
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 75) return 'green'
    if (percentage >= 45) return 'orange'
    return 'red'
  }

  const getChanceColor = (chance) => {
    if (!chance) return 'gray'
    if (chance.toLowerCase() === 'high') return 'green'
    if (chance.toLowerCase() === 'medium') return 'orange'
    return 'red'
  }

  const shortBranchSafe = (shortBranch || branch || '').toString()

  return (
    <article className="college-card" aria-labelledby={`college-${id}`}>
      <header className="card-header">
        <div className="card-title">
          <h3 id={`college-${id}`}>{shortName || name}</h3>
          <p className="branch">{shortBranchSafe}</p>
        </div>
        <div className="card-actions">
          <button onClick={handleFavoriteToggle} className={`icon-btn fav ${fav ? 'active' : ''}`} aria-label="Toggle favorite">
            {fav ? '★' : '☆'}
          </button>
          <button onClick={handleCompareToggle} className={`icon-btn cmp ${inCompare ? 'active' : ''}`} aria-label="Toggle compare">
            {inCompare ? '−' : '+'}
          </button>
        </div>
      </header>

      <div className="card-body">
        <div className="meta">
          <div className="meta-item"><strong>Type:</strong> {institutionType}</div>
          <div className="meta-item"><strong>State:</strong> {state}</div>
          <div className="meta-item"><strong>Region:</strong> {region}</div>
        </div>

        <div className="match-row">
          <div className="match-value" style={{ color: getMatchColor(matchPercentage) }}>
            {matchPercentage}% match
          </div>
          <div className="chance-value" style={{ color: getChanceColor(admissionChance) }}>
            {admissionChance || 'Unknown'}
          </div>
        </div>

        <div className="cutoff-row">
          <div><strong>Cutoff:</strong> {appliedCutoff ?? (college.closingRank ?? 'N/A')}</div>
          <div><strong>Status:</strong> {eligibilityStatus}</div>
        </div>
      </div>
    </article>
  )
}

export default CollegeCard