# JEE College Predictor - Testing Checklist

## Quick Testing Guide

### ✅ Pre-Testing Setup
- [ ] Backend running on `http://localhost:8080` (optional - will fallback to mock data)
- [ ] Frontend running on `http://localhost:3000`
- [ ] Browser DevTools open (Console + Network tabs)
- [ ] Clear localStorage (for clean test): `localStorage.clear()`

---

## 1. PREDICTION FLOW (5 min)

### Test Case 1.1: Valid Prediction
- [ ] Navigate to `/predict`
- [ ] Fill all required fields:
  - JEE Rank: `5000`
  - Category: `OPEN`
  - Gender: `Gender-Neutral`
  - Institution Type: `NIT`
  - Year: `2024`
  - Round: `1`
  - Region: `South` (or any)
- [ ] Click "Get Predictions"
- [ ] **Expected:** Navigate to `/results` with colleges displayed
- [ ] **Check Console:** "Sending prediction request" log

### Test Case 1.2: Validation Errors
- [ ] Navigate to `/predict`
- [ ] Leave JEE Rank empty
- [ ] Click "Get Predictions"
- [ ] **Expected:** Red error message "JEE Rank is required"
- [ ] Enter invalid rank: `0` or `2000000`
- [ ] **Expected:** Error about valid range (1-1,000,000)

### Test Case 1.3: Location Validation
- [ ] Fill all fields EXCEPT State and Region
- [ ] Click "Get Predictions"
- [ ] **Expected:** "Please select either a State or a Region" error
- [ ] Select Region: `North`
- [ ] Click "Get Predictions"
- [ ] **Expected:** Successful prediction

---

## 2. CASCADING FILTERS (5 min)

### Test Case 2.1: Region → State Cascade
- [ ] On Results page, check initial state dropdown
- [ ] **Expected:** All states available
- [ ] Select Region: `North`
- [ ] **Expected:** State dropdown shows only North states (Delhi, Haryana, Punjab, etc.)
- [ ] **Check Console:** "States for North region: [...]" log
- [ ] Select a State from filtered list
- [ ] **Expected:** Results filter to that state
- [ ] **Check Console:** "After state filter: X" log

### Test Case 2.2: Region Change Clears State
- [ ] Region: `North` + State: `Delhi` selected
- [ ] Change Region to: `South`
- [ ] **Expected:** State filter automatically clears
- [ ] **Expected:** State dropdown now shows South states
- [ ] **Check Console:** Logs showing filter changes

### Test Case 2.3: Clear All Filters
- [ ] Apply both Region and State filters
- [ ] Click "Clear All" button
- [ ] **Expected:** Both filters reset to "All Regions" and "Select State"
- [ ] **Expected:** Full results list restored

---

## 3. SORTING & PAGINATION (3 min)

### Test Case 3.1: Sort by Match Percentage
- [ ] Click "Sort by Match" button
- [ ] **Expected:** Button shows active state
- [ ] **Expected:** Results ordered by match % (highest first)
- [ ] Click again
- [ ] **Expected:** Arrow flips (↓ to ↑), order reverses

### Test Case 3.2: Sort by Cutoff
- [ ] Click "Sort by Cutoff" button
- [ ] **Expected:** Results reorder by closing rank
- [ ] **Expected:** Match button becomes inactive

### Test Case 3.3: Pagination
- [ ] If more than 10 results, check pagination
- [ ] Click page 2 button
- [ ] **Expected:** Shows results 11-20
- [ ] **Expected:** Page scrolls to top
- [ ] **Expected:** Page 2 button highlighted

---

## 4. FAVORITES SYSTEM (5 min)

### Test Case 4.1: Add to Favorites
- [ ] Find a college card
- [ ] Click star icon (☆)
- [ ] **Expected:** Star fills (★), color changes
- [ ] **Check Console:** "Added to favorites: [college name]" log
- [ ] Click star again
- [ ] **Expected:** Star empties (☆)
- [ ] **Check Console:** "Removed from favorites: [id]" log

### Test Case 4.2: Prevent Duplicates
- [ ] Add same college to favorites twice
- [ ] **Expected:** Only one entry in favorites
- [ ] No console errors

### Test Case 4.3: Favorites Page
- [ ] Add 2-3 colleges to favorites
- [ ] Navigate to `/favorites`
- [ ] **Expected:** All favorited colleges displayed
- [ ] Remove one college
- [ ] **Expected:** Updates immediately

### Test Case 4.4: Persistence
- [ ] Add colleges to favorites
- [ ] Refresh page (F5)
- [ ] Navigate back to `/favorites`
- [ ] **Expected:** Favorites still there
- [ ] **Check:** `localStorage.getItem('jee_favorites')`

---

## 5. COMPARISON SYSTEM (5 min)

### Test Case 5.1: Add to Compare
- [ ] Find a college card
- [ ] Click + button
- [ ] **Expected:** Button changes to −
- [ ] **Check Console:** "Added to compare: [college name]" log
- [ ] Add 3 more colleges (total 4)
- [ ] **Expected:** All 4 added successfully

### Test Case 5.2: Max Limit Enforcement
- [ ] With 4 colleges already in compare
- [ ] Try adding 5th college
- [ ] **Expected:** Alert "You can compare maximum 4 colleges at a time"
- [ ] **Expected:** 5th college NOT added

### Test Case 5.3: Compare Page
- [ ] Navigate to `/compare`
- [ ] **Expected:** Side-by-side comparison table
- [ ] **Expected:** All 13 fields displayed:
  - Institute Name
  - Branch
  - Type
  - State
  - Region
  - Match Score
  - Admission Chance
  - Opening Rank
  - Closing Rank
  - Applied Cutoff
  - Year
  - Round
  - Eligibility

### Test Case 5.4: Remove from Compare
- [ ] On Compare page, click × button on a college
- [ ] **Expected:** That college removed from table
- [ ] Click "Clear All"
- [ ] **Expected:** All colleges removed
- [ ] **Expected:** Shows "No Colleges to Compare" message

### Test Case 5.5: Persistence
- [ ] Add colleges to compare
- [ ] Refresh page
- [ ] Navigate to `/compare`
- [ ] **Expected:** Compare list persists
- [ ] **Check:** `localStorage.getItem('jee_compare')`

---

## 6. BACKEND INTEGRATION (5 min)

### Test Case 6.1: Backend Available
- [ ] Ensure backend running on port 8080
- [ ] Submit prediction form
- [ ] **Check Network Tab:** POST to `http://localhost:8080/api/predict`
- [ ] **Expected:** Status 200
- [ ] **Check Console:** "Received data: [...]" log
- [ ] **Expected:** Real results from backend

### Test Case 6.2: Backend Unavailable
- [ ] Stop backend server
- [ ] Submit prediction form
- [ ] **Check Network Tab:** Request fails
- [ ] **Check Console:** "Cannot connect to backend..." error
- [ ] **Expected:** Falls back to mock data
- [ ] **Expected:** Error message shown to user

### Test Case 6.3: CORS Error (if applicable)
- [ ] If CORS not configured on backend
- [ ] **Expected:** Specific CORS error message
- [ ] **Expected:** Fallback to mock data

---

## 7. UI/UX CHECKS (5 min)

### Test Case 7.1: Empty States
- [ ] Navigate to `/favorites` with no favorites
- [ ] **Expected:** "No favorites added" message
- [ ] Navigate to `/compare` with no colleges
- [ ] **Expected:** "No Colleges to Compare" message
- [ ] Apply filters that match nothing
- [ ] **Expected:** "No colleges found" message

### Test Case 7.2: Loading States
- [ ] Submit prediction form
- [ ] **Expected:** Button text changes to "Processing..."
- [ ] **Expected:** Button disabled during loading

### Test Case 7.3: Visual Feedback
- [ ] Check match percentages have colors:
  - Green for >75%
  - Orange for 45-75%
  - Red for <45%
- [ ] Check admission chances have colors:
  - Green for High
  - Orange for Medium
  - Red for Low
- [ ] Check active filter buttons highlighted
- [ ] Check pagination current page highlighted

### Test Case 7.4: Responsive Behavior
- [ ] Resize browser window
- [ ] **Expected:** Layout adjusts properly
- [ ] Cards stack vertically on narrow screens
- [ ] Filter panel adapts

---

## 8. ERROR HANDLING (3 min)

### Test Case 8.1: Invalid Data Handling
- [ ] Open DevTools Console
- [ ] Submit prediction with extreme rank: `999999`
- [ ] **Expected:** No console errors
- [ ] **Expected:** Handles gracefully

### Test Case 8.2: Missing Properties
- [ ] Check colleges with missing fields (if any)
- [ ] **Expected:** Shows "N/A" instead of undefined
- [ ] No console errors about undefined properties

---

## 9. NAVIGATION (2 min)

### Test Case 9.1: Route Navigation
- [ ] Navigate through all pages:
  - `/` → Home
  - `/predict` → Prediction form
  - `/results` → Results (after prediction)
  - `/compare` → Comparison
  - `/favorites` → Favorites
  - `/about` → About page
  - `/contact` → Contact page
- [ ] **Expected:** All routes work, no 404 errors
- [ ] Click browser back button
- [ ] **Expected:** Previous page loads

### Test Case 9.2: Results Protection
- [ ] Navigate directly to `/results` without prediction
- [ ] **Expected:** Redirects to `/predict`
- [ ] Make prediction, navigate away, come back to `/results`
- [ ] **Expected:** Results still there (stored in context)

---

## 10. CONSOLE & NETWORK (Throughout Testing)

### Console Logs to Monitor:
- [ ] "Sending prediction request: [...]"
- [ ] "Received data: [...]"
- [ ] "Region changed to: [...]"
- [ ] "States for [region] region: [...]"
- [ ] "After region filter: X"
- [ ] "After state filter: X"
- [ ] "Added to favorites: [...]"
- [ ] "Added to compare: [...]"
- [ ] No error messages (red text)
- [ ] No warning messages (yellow text)

### Network Tab:
- [ ] Only one prediction request per submit
- [ ] Request payload matches form data
- [ ] Response is valid JSON array
- [ ] No failed requests (except when backend down intentionally)

---

## 11. DATA INTEGRITY (Final Checks)

### LocalStorage Inspection
Open DevTools > Application > Local Storage:
- [ ] `jee_favorites` - Valid JSON array
- [ ] `jee_compare` - Valid JSON array
- [ ] Both contain proper college objects with all fields

### Context State (Use React DevTools)
- [ ] PredictionContext has `formData` and `results`
- [ ] FavoritesContext has `favorites` and `compareList`
- [ ] No undefined or null states unexpectedly

---

## PASS CRITERIA

### ✅ All Tests Passed If:
1. No console errors (red)
2. All features work as expected
3. Favorites/Compare persist on reload
4. Filters cascade properly
5. Validation catches all invalid inputs
6. Backend integration OR mock fallback works
7. UI shows proper loading/error states
8. Navigation works smoothly
9. No broken functionality

### ❌ Known Issues to Ignore:
- Warning about React Router future flags (non-critical)
- Console logs (debugging - can be removed later)

---

## TIME ESTIMATE
- **Full Test Suite:** ~40 minutes
- **Quick Smoke Test:** ~10 minutes (cases 1.1, 2.1, 4.1, 5.1)
- **Critical Path:** ~15 minutes (cases 1, 2, 4.3, 5.3)

---

## REPORTING BUGS

If you find issues:
1. Note the test case number
2. Copy console error (if any)
3. Note steps to reproduce
4. Include screenshots if UI issue
5. Check browser/version

---

**Last Updated:** Current Session
**Version:** 1.0
**Status:** Ready for Testing
