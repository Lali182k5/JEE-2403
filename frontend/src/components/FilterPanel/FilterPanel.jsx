import React from 'react'
import { formOptions } from '../../data/mockData'
import './FilterPanel.css'

const FilterPanel = ({ filters, onFilterChange, results }) => {
  const handleFilterUpdate = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    })
  }

  const clearFilters = () => {
    onFilterChange({
      state: '',
      region: ''
    })
  }

  const hasActiveFilters = () => {
    return filters.state || filters.region
  }

  // Get unique values from results for dynamic filtering
  const getUniqueValues = (field) => {
    if (!results) return []
    const values = [...new Set(results.map(college => college[field]))]
    return values.filter(Boolean).sort()
  }

  // Get states grouped by region - This creates the mapping
  const getStatesByRegion = () => {
    if (!results) return {}
    
    const stateRegionMap = {}
    results.forEach(college => {
      if (college.state && college.region) {
        if (!stateRegionMap[college.region]) {
          stateRegionMap[college.region] = new Set()
        }
        stateRegionMap[college.region].add(college.state)
      }
    })

    // Convert Sets to sorted arrays
    const groupedStates = {}
    Object.keys(stateRegionMap).sort().forEach(region => {
      groupedStates[region] = Array.from(stateRegionMap[region]).sort()
    })

    console.log('States grouped by region:', groupedStates)
    return groupedStates
  }

  const regions = getUniqueValues('region')
  const statesByRegion = getStatesByRegion()

  // Get counts for each filter
  const getCount = (field, value) => {
    if (!results) return 0
    return results.filter(c => c[field] === value).length
  }

  // Get filtered states based on selected region - THIS IS THE KEY FUNCTION
  const getFilteredStates = () => {
    if (!filters.region) {
      // If no region selected, show all states
      return getUniqueValues('state')
    }
    // Show only states from selected region
    const filteredStates = statesByRegion[filters.region] || []
    console.log(`States for ${filters.region} region:`, filteredStates)
    return filteredStates
  }

  const filteredStates = getFilteredStates()

  return (
    <div className="filter-panel">
      {/* Filter Header with Clear All */}
      <div className="filter-section">
        <div className="filter-section-header">
          <h4>Filters</h4>
          {hasActiveFilters() && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Region Filter */}
      <div className="filter-section">
        <div className="filter-section-header">
          <h4>Region</h4>
        </div>
        <div className="filter-content">
          <select
            value={filters.region}
            onChange={(e) => {
              const newRegion = e.target.value
              console.log('Region changed to:', newRegion)
              
              // CRITICAL: Update both region and clear state in one call
              onFilterChange({
                ...filters,
                region: newRegion,
                state: '' // Clear state when region changes
              })
            }}
            className="filter-select"
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>
                {region} ({getCount('region', region)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State Filter - Dynamically shows states based on selected region */}
      <div className="filter-section">
        <div className="filter-section-header">
          <h4>State</h4>
          {filters.region && (
            <span className="filter-info">({filters.region} Region)</span>
          )}
        </div>
        <div className="filter-content">
          <select
            value={filters.state}
            onChange={(e) => {
              const newState = e.target.value
              console.log('State changed to:', newState)
              handleFilterUpdate('state', newState)
            }}
            className="filter-select"
            disabled={filteredStates.length === 0}
          >
            <option value="">
              {filters.region 
                ? `All States in ${filters.region}` 
                : 'Select State'
              }
            </option>
            {/* THIS SHOWS ONLY FILTERED STATES */}
            {filteredStates.map(state => (
              <option key={state} value={state}>
                {state} ({getCount('state', state)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Info */}
      {hasActiveFilters() && (
        <div className="filter-info-section">
          <div className="filter-info-text">
            {filters.region && !filters.state && (
              <p>Showing all colleges in <strong>{filters.region}</strong> region</p>
            )}
            {filters.state && (
              <p>Showing colleges in <strong>{filters.state}</strong></p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel