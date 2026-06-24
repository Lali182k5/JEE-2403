import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrediction } from '../../context/PredictionContext'
import { formOptions, generateMockPredictions } from '../../data/mockData'
import { predictColleges } from '../../services/api'
import './Predict.css'

const Predict = () => {
  const navigate = useNavigate()
  const {
    formData,
    loading,
    error,
    updateFormField,
    setResults,
    setLoading,
    setError,
    clearError
  } = usePrediction()

  const [validationErrors, setValidationErrors] = useState({})

  // validation rules (same as before)
  const validationRules = {
    jeeRank: { label: 'JEE Rank', required: true, min: 1, max: 1000000 },
    category: { label: 'Category', required: true },
    gender: { label: 'Gender', required: true },
    institutionType: { label: 'Institution Type', required: true },
    year: { label: 'Year', required: true },
    round: { label: 'Round', required: true },
    // state / region: at least one required (handled explicitly)
  }

  useEffect(() => {
    clearError()
  }, [clearError])

  const validateAll = () => {
    const errors = {}
    // required fields
    Object.keys(validationRules).forEach((k) => {
      const rule = validationRules[k]
      const value = formData[k]
      if (rule.required && (value === undefined || value === null || value === '' )) {
        errors[k] = `${rule.label} is required`
      }
      if (k === 'jeeRank' && value) {
        const rank = parseInt(value, 10)
        if (isNaN(rank) || rank < rule.min || rank > rule.max) {
          errors[k] = `Please enter a valid rank between ${rule.min} and ${rule.max}`
        }
      }
    })

    // location rule: either state or region
    if (!formData.state && !formData.region) {
      errors.location = 'Please select either a State or a Region'
    }

    setValidationErrors(errors)
    if (Object.keys(errors).length > 0) {
      setError(errors.location || 'Please fix validation errors')
      return false
    }
    clearError()
    return true
  }

  // Update the validation logic in handleSubmit or wherever the validation occurs
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setValidationErrors({})
    const newErrors = {}

    // Validate required fields
    if (!formData.jeeRank || formData.jeeRank <= 0) {
      newErrors.jeeRank = 'Please enter a valid JEE Main rank'
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select gender'
    }
    if (!formData.institutionType) {
      newErrors.institutionType = 'Please select institution type'
    }
    if (!formData.year) {
      newErrors.year = 'Please select year'
    }
    if (!formData.round) {
      newErrors.round = 'Please select round'
    }

    // NO LOCATION VALIDATION - "Any" for both is valid

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors)
      return
    }

    // Proceed with predictions
    setLoading(true)
    clearError()

    const payload = {
      jeeRank: Number(formData.jeeRank),
      category: formData.category,
      gender: formData.gender,
      institutionTypeFilter: formData.institutionType || '',
      yearFilter: formData.year ? Number(formData.year) : null,
      roundFilter: formData.round ? Number(formData.round) : null,
      stateFilter: formData.state || '',
      regionFilter: formData.region || ''
    }

    console.log('Predict payload:', payload)

    let backendResults = null
    try {
      backendResults = await predictColleges(payload)
      console.log('Backend results (raw):', backendResults)
      if (Array.isArray(backendResults) && backendResults.length === 0) {
        setError('Backend returned no predictions. Using local fallback.')
        backendResults = null
      }
    } catch (apiErr) {
      console.warn('Backend predict failed:', apiErr)
      setError(`Backend error: ${apiErr.message || apiErr}`)
      backendResults = null
    }

    let predictions = []
    if (Array.isArray(backendResults) && backendResults.length > 0) {
      const mapItem = (it) => {
        const institute = it.instituteName || it.name || it.institute || ''
        const branch = it.branch || ''
        const shortName = it.shortName || institute.split(',')[0] || institute
        const type = it.institutionType || it.type || ''
        const id = it.id || `${institute}-${branch}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const matchPercentage = Number(it.matchPercentage) || 0

        return {
          id,
          name: institute,
          shortName,
          type,
          institutionType: type,
          branch,
          shortBranch: (branch || '').split(' ').slice(0,3).join(' '),
          state: it.state || '',
          region: it.region || '',
          matchPercentage,
          appliedCutoff: it.appliedCutoff || it.closingRank || null,
          eligibilityStatus: it.eligibilityStatus || (matchPercentage >= 50 ? 'Eligible' : 'Not Eligible'),
          admissionChance: it.admissionChance || (matchPercentage > 75 ? 'High' : matchPercentage > 45 ? 'Medium' : 'Low')
        }
      }

      predictions = backendResults.map(mapItem)
    } else {
      predictions = await generateMockPredictions(formData)
    }

    console.log('Predictions to set (count):', predictions && predictions.length)
    setResults(predictions)
    setLoading(false)
    navigate('/results')
  }

  // Update the disabled logic for dropdowns - only disable if a SPECIFIC value is selected
  const isRegionSelected = formData.region && formData.region.trim() !== '' && formData.region.toLowerCase() !== 'any'
  const isStateSelected = formData.state && formData.state.trim() !== '' && formData.state.toLowerCase() !== 'any'

  return (
    <div className="predict-page">
      <div className="container">
        <div className="predict-content single-page">
          <div className="predict-header">
            <h1>College Prediction Tool</h1>
            <p>Fill all fields below and click "Get Predictions"</p>
          </div>

          <form className="single-form" onSubmit={handleSubmit} noValidate>
            <div className="grid">
              <div className="input-group">
                <label>JEE Main Rank *</label>
                <input
                  type="number"
                  value={formData.jeeRank || ''}
                  onChange={(e) => updateFormField('jeeRank', e.target.value)}
                  min="1"
                  max="1000000"
                  className={validationErrors.jeeRank ? 'error' : ''}
                  placeholder="e.g., 12345"
                />
                {validationErrors.jeeRank && <div className="error-message">{validationErrors.jeeRank}</div>}
              </div>

              <div className="input-group">
                <label>Category *</label>
                <select value={formData.category || ''} onChange={(e) => updateFormField('category', e.target.value)} className={validationErrors.category ? 'error' : ''}>
                  <option value="">Choose category</option>
                  {formOptions.categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                {validationErrors.category && <div className="error-message">{validationErrors.category}</div>}
              </div>

              <div className="input-group">
                <label>Gender *</label>
                <select value={formData.gender || ''} onChange={(e) => updateFormField('gender', e.target.value)} className={validationErrors.gender ? 'error' : ''}>
                  <option value="">Choose gender</option>
                  {formOptions.genders.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
                {validationErrors.gender && <div className="error-message">{validationErrors.gender}</div>}
              </div>

              <div className="input-group">
                <label>Institution Type *</label>
                <select value={formData.institutionType || ''} onChange={(e) => updateFormField('institutionType', e.target.value)} className={validationErrors.institutionType ? 'error' : ''}>
                  <option value="">Choose type</option>
                  {formOptions.institutionTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {validationErrors.institutionType && <div className="error-message">{validationErrors.institutionType}</div>}
              </div>

              <div className="input-group">
                <label>Year *</label>
                <select value={formData.year || ''} onChange={(e) => updateFormField('year', e.target.value)} className={validationErrors.year ? 'error' : ''}>
                  <option value="">Choose year</option>
                  {formOptions.years.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                </select>
                {validationErrors.year && <div className="error-message">{validationErrors.year}</div>}
              </div>

              <div className="input-group">
                <label>Round *</label>
                <select value={formData.round || ''} onChange={(e) => updateFormField('round', e.target.value)} className={validationErrors.round ? 'error' : ''}>
                  <option value="">Choose round</option>
                  {formOptions.rounds.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                {validationErrors.round && <div className="error-message">{validationErrors.round}</div>}
              </div>

              <div className="input-group">
                <label>Region (optional)</label>
                <select
                  value={formData.region || ''}
                  onChange={(e) => {
                    updateFormField('region', e.target.value)
                  }}
                  disabled={isStateSelected} // only disable if specific state selected
                >
                  <option value="">Any</option>
                  {formOptions.regions.filter(r => r.value !== '').map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>State (optional)</label>
                <select
                  value={formData.state || ''}
                  onChange={(e) => {
                    updateFormField('state', e.target.value)
                  }}
                  disabled={isRegionSelected} // only disable if specific region selected
                >
                  <option value="">Any</option>
                  {formOptions.states.filter(s => s.value !== '').map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="error-alert">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Processing...' : 'Get Predictions'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => { 
                updateFormField('state','')
                updateFormField('region','')
                updateFormField('branch','')
              }}>
                Clear location/branch
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Predict