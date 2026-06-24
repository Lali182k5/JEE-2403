import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [compareList, setCompareList] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('jee_favorites')
      const savedCompare = localStorage.getItem('jee_compare')
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
      if (savedCompare) {
        setCompareList(JSON.parse(savedCompare))
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('jee_favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Error saving favorites:', error)
    }
  }, [favorites])

  // Save to localStorage whenever compareList changes
  useEffect(() => {
    try {
      localStorage.setItem('jee_compare', JSON.stringify(compareList))
    } catch (error) {
      console.error('Error saving compare list:', error)
    }
  }, [compareList])

  const addToFavorites = (college) => {
    if (!isFavorite(college.id)) {
      setFavorites(prev => [...prev, college])
      console.log('Added to favorites:', college.instituteName)
    }
  }

  const removeFromFavorites = (collegeId) => {
    setFavorites(prev => prev.filter(c => c.id !== collegeId))
    console.log('Removed from favorites:', collegeId)
  }

  const isFavorite = (collegeId) => {
    return favorites.some(c => c.id === collegeId)
  }

  const addToCompare = (college) => {
    // Maximum 4 colleges for comparison
    if (compareList.length >= 4) {
      alert('You can compare maximum 4 colleges at a time')
      return false
    }
    
    if (!isInCompare(college.id)) {
      setCompareList(prev => [...prev, college])
      console.log('Added to compare:', college.instituteName)
      return true
    }
    return false
  }

  const removeFromCompare = (collegeId) => {
    setCompareList(prev => prev.filter(c => c.id !== collegeId))
    console.log('Removed from compare:', collegeId)
  }

  const isInCompare = (collegeId) => {
    return compareList.some(c => c.id === collegeId)
  }

  const clearCompareList = () => {
    setCompareList([])
    console.log('Cleared compare list')
  }

  const value = {
    favorites,
    compareList,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompareList
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}