import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import './Compare.css'

const Compare = () => {
  const navigate = useNavigate()
  const { compareList, removeFromCompare, clearCompareList } = useFavorites()

  if (compareList.length === 0) {
    return (
      <div className="compare-page">
        <div className="container">
          <div className="empty-compare">
            <h2>No Colleges to Compare</h2>
            <p>Add colleges from results page to compare them side by side</p>
            <button className="btn-primary" onClick={() => navigate('/results')}>
              Go to Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  const comparisonFields = [
    { key: 'instituteName', label: 'Institute Name' },
    { key: 'branch', label: 'Branch' },
    { key: 'institutionType', label: 'Type' },
    { key: 'state', label: 'State' },
    { key: 'region', label: 'Region' },
    { key: 'matchPercentage', label: 'Match Score', suffix: '%' },
    { key: 'admissionChance', label: 'Admission Chance' },
    { key: 'openingRank', label: 'Opening Rank', format: 'number' },
    { key: 'closingRank', label: 'Closing Rank', format: 'number' },
    { key: 'appliedCutoff', label: 'Applied Cutoff', format: 'number' },
    { key: 'year', label: 'Year' },
    { key: 'round', label: 'Round' },
    { key: 'eligibilityStatus', label: 'Eligibility' }
  ]

  const formatValue = (value, format, suffix) => {
    if (value === null || value === undefined || value === '') return 'N/A'
    if (format === 'number') {
      const num = Number(value)
      return isNaN(num) ? 'N/A' : num.toLocaleString()
    }
    if (suffix) return `${value}${suffix}`
    return value
  }

  return (
    <div className="compare-page">
      <div className="container">
        <div className="compare-header">
          <h1>Compare Colleges</h1>
          <div className="compare-actions">
            <button className="btn-secondary" onClick={clearCompareList}>
              Clear All
            </button>
            <button className="btn-primary" onClick={() => navigate('/results')}>
              Back to Results
            </button>
          </div>
        </div>

        <div className="compare-table-container">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="field-column">Field</th>
                {compareList.map((college, index) => (
                  <th key={college.id} className="college-column">
                    <div className="college-header">
                      <span className="college-number">College {index + 1}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCompare(college.id)}
                        title="Remove from comparison"
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map(field => (
                <tr key={field.key}>
                  <td className="field-label">{field.label}</td>
                  {compareList.map(college => (
                    <td key={`${college.id}-${field.key}`} className="field-value">
                      {formatValue(college[field.key], field.format, field.suffix)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Compare