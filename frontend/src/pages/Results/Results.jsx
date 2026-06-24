import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrediction } from '../../context/PredictionContext'
import { useFavorites } from '../../context/FavoritesContext'
import CollegeCard from '../../components/CollegeCard/CollegeCard'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import './Results.css'

const Results = () => {
  const navigate = useNavigate()
  const { formData, results, loading } = usePrediction()
  const { favorites, compareList } = useFavorites()

  const [filteredResults, setFilteredResults] = useState([])
  const [filters, setFilters] = useState({
    region: '',
    state: ''
  })
  const [sortBy, setSortBy] = useState('matchPercentage')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  // Redirect back if no input/results
  useEffect(() => {
    if (!loading && (!results || results.length === 0)) {
      if (formData && formData.jeeRank) {
        setFilteredResults([])
      } else {
        navigate('/predict')
      }
    } else {
      setFilteredResults(results || [])
    }
  }, [results, loading, navigate, formData])

  // Apply filters & sorting whenever results or filters change
  useEffect(() => {
    let list = (results || []).slice()

    console.log('Original results count:', list.length)

    // Region filter
    if (filters.region && filters.region !== '') {
      list = list.filter(c => {
        const collegeRegion = (c.region || '').toString().trim()
        const filterRegion = filters.region.toString().trim()
        return collegeRegion === filterRegion
      })
      console.log('After region filter:', list.length, 'Region:', filters.region)
    }

    // State filter
    if (filters.state && filters.state !== '') {
      list = list.filter(c => {
        const collegeState = (c.state || '').toString().trim()
        const filterState = filters.state.toString().trim()
        return collegeState === filterState
      })
      console.log('After state filter:', list.length, 'State:', filters.state)
    }

    // Sorting
    list.sort((a, b) => {
      const aVal = a[sortBy] ?? 0
      const bVal = b[sortBy] ?? 0
      if (sortOrder === 'asc') return aVal - bVal
      return bVal - aVal
    })

    console.log('Final filtered results:', list.length)
    setFilteredResults(list)
    setCurrentPage(1)
  }, [results, filters, sortBy, sortOrder])

  const handleFilterChange = (newFilters) => {
    console.log('Filter changed:', newFilters)
    setFilters(newFilters)
  }

  const handleSortChange = (field) => {
    if (field === sortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / resultsPerPage))
  const startIndex = (currentPage - 1) * resultsPerPage
  const currentResults = filteredResults.slice(startIndex, startIndex + resultsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Smart pagination: show limited page numbers
  const getPaginationRange = () => {
    const delta = 2 // pages to show on each side of current page
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  useEffect(() => {
    console.log('RESULTS from context:', results)
  }, [results])

  if (loading) {
    return (
      <div className="results-page">
        <div className="container">
          <div className="loading">Loading predictions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header">
          <h1>Predicted Colleges</h1>
          <p>
            {filteredResults.length === results?.length 
              ? `${results.length} recommendations` 
              : `Showing ${filteredResults.length} of ${results?.length || 0} recommendations`
            }
          </p>
        </div>

        <div className="results-body">
          <aside className="results-sidebar">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              results={results} 
            />
          </aside>

          <main className="results-main">
            <div className="results-controls">
              {/* <div className="sort-controls">
                <button 
                  className={`btn ${sortBy === 'matchPercentage' ? 'active' : ''}`}
                  onClick={() => handleSortChange('matchPercentage')}
                >
                  Sort by Match {sortBy === 'matchPercentage' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button 
                  className={`btn ${sortBy === 'appliedCutoff' ? 'active' : ''}`}
                  onClick={() => handleSortChange('appliedCutoff')}
                >
                  Sort by Cutoff {sortBy === 'appliedCutoff' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div> */}
              <div className="page-info">
                Page {currentPage} / {totalPages}
              </div>
            </div>

            {currentResults.length === 0 ? (
              <div className="empty-results">
                <h3>No colleges found for the selected filters.</h3>
                <p>Try clearing filters or go back to Predict and change inputs.</p>
              </div>
            ) : (
              <div className="cards-grid">
                 {currentResults.map((college, index) => (
                  <CollegeCard key={`${college.id}-${index}`} college={college} />
                ))}
              </div>
            )}

            {/* Improved Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                {getPaginationRange().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="page-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`page-btn ${page === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  className="page-btn nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Results