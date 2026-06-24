import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'

// Initial state
const initialState = {
  formData: {
    jeeRank: '',
    category: '',
    gender: '',
    institutionType: '',
    year: '',
    round: '',
    state: '',
    region: '',
    branch: ''
  },
  results: [],
  loading: false,
  error: null,
  currentStep: 1,
  totalSteps: 8
}

// Action types
const actionTypes = {
  SET_FORM_DATA: 'SET_FORM_DATA',
  UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
  SET_RESULTS: 'SET_RESULTS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  RESET_FORM: 'RESET_FORM',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP'
}

// Reducer function
const predictionReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      }
    case actionTypes.UPDATE_FORM_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value
        }
      }
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false,
        error: null
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case actionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      }
    case actionTypes.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps)
      }
    case actionTypes.PREV_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1)
      }
    case actionTypes.RESET_FORM:
      return {
        ...initialState
      }
    default:
      return state
  }
}

// Create context (explicit null initial value)
const PredictionContext = createContext(null)

// Provider component
export const PredictionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(predictionReducer, initialState)

  // Memoized action creators to keep stable references
  const setFormData = useCallback((data) => dispatch({ type: actionTypes.SET_FORM_DATA, payload: data }), [dispatch])
  const updateFormField = useCallback((field, value) => dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { field, value } }), [dispatch])
  const setResults = useCallback((results) => dispatch({ type: actionTypes.SET_RESULTS, payload: results }), [dispatch])
  const setLoading = useCallback((loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }), [dispatch])
  const setError = useCallback((error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }), [dispatch])
  const clearError = useCallback(() => dispatch({ type: actionTypes.CLEAR_ERROR }), [dispatch])
  const setCurrentStep = useCallback((step) => dispatch({ type: actionTypes.SET_CURRENT_STEP, payload: step }), [dispatch])
  const nextStep = useCallback(() => dispatch({ type: actionTypes.NEXT_STEP }), [dispatch])
  const prevStep = useCallback(() => dispatch({ type: actionTypes.PREV_STEP }), [dispatch])
  const resetForm = useCallback(() => dispatch({ type: actionTypes.RESET_FORM }), [dispatch])

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({
    ...state,
    setFormData,
    updateFormField,
    setResults,
    setLoading,
    setError,
    clearError,
    setCurrentStep,
    nextStep,
    prevStep,
    resetForm
  }), [
    state,
    setFormData,
    updateFormField,
    setResults,
    setLoading,
    setError,
    clearError,
    setCurrentStep,
    nextStep,
    prevStep,
    resetForm
  ])

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  )
}

// Custom hook to use prediction context
export const usePrediction = () => {
  const context = useContext(PredictionContext)
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider')
  }
  return context
}

export default PredictionContext