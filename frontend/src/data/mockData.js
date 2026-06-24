// Mock college data with comprehensive information
export const mockColleges = [
  {
    id: 'nit-kurukshetra-computer',
    institute: 'National Institute of Technology, Kurukshetra',
    academicProgram: 'Computer Engineering (4 Years, Bachelor of Technology)',
    institutionType: 'NIT',
    openingRank: 717,
    closingRank: 1118,
    year: 2022,
    round: 1,
    state: 'Haryana',
    region: 'North',
    seatType: 'OPEN',
    gender: 'Gender-Neutral'
  },
  {
    id: 'iit-delhi-cse',
    institute: 'Indian Institute of Technology, Delhi',
    academicProgram: 'Computer Science & Engineering',
    institutionType: 'IIT',
    openingRank: 1,
    closingRank: 10,
    year: 2022,
    round: 1,
    state: 'Delhi',
    region: 'North',
    seatType: 'OPEN',  // Add these fields to match backend
    gender: 'Gender-Neutral'
  },
  {
    id: 'nit-suratkal-cse',
    institute: 'National Institute of Technology, Surathkal',
    academicProgram: 'Computer Science & Engineering',
    institutionType: 'NIT',
    openingRank: 100,
    closingRank: 500,
    year: 2022,
    round: 1,
    state: 'Karnataka',
    region: 'South',
    seatType: 'OPEN',  // Add these fields to match backend
    gender: 'Gender-Neutral'
  }
]

// simple form options used by Predict page
export const formOptions = {
  categories: [
    { value: 'OPEN', label: 'OPEN' },
    { value: 'OBC-NCL', label: 'OBC-NCL' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
    { value: 'EWS', label: 'EWS' }
  ],
  genders: [
    { value: 'Gender-Neutral', label: 'Gender-Neutral' },
    { value: 'Female-only (including Supernumerary)', label: 'Female-only' }
  ],
  institutionTypes: [
    { value: 'Any', label: 'Any' },
    { value: 'IIT', label: 'IIT' },
    { value: 'NIT', label: 'NIT' },
    { value: 'IIIT', label: 'IIIT' },
   // { value: 'GIFT', label: 'GIFT' }, // Fixed GIFT to GIFT
    { value: 'Other', label: 'Other' }
  ],
  years: [
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' }
  ],
  rounds: [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' }
  ],
  regions: [
    { value: 'North-East', label: 'North-East' },
    { value: 'North', label: 'North' },
    { value: 'Central', label: 'Central' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' }
  ],
  states: [
    { value: '', label: 'Any' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' }
  ]
}

// generateMockPredictions(formData)
// - implements state OR region filtering
// - computes matchPercentage using user's rank vs closingRank (defensive)
export async function generateMockPredictions(formData) {
  const { 
    jeeRank, 
    category = 'OPEN',
    gender = 'Gender-Neutral',
    institutionType = '',
    year,
    round,
    state = '',
    region = '',
    branch = ''
  } = formData || {};

  // Match backend validation
  if (!jeeRank || isNaN(Number(jeeRank))) {
    console.error('Invalid JEE Rank');
    return [];
  }

  let list = mockColleges.map(c => ({ ...c }));
  const userRank = Number(jeeRank);

  // Apply filters matching backend logic
  list = list.filter(college => {
    // Basic rank validation
    if (college.closingRank <= 0) return false;
    if (userRank > college.closingRank * 5) return false;

    // Match filters exactly as backend does
    if (year && college.year !== Number(year)) return false;
    if (round && college.round !== Number(round)) return false;
    if (state && college.state.toLowerCase() !== state.toLowerCase()) return false;
    if (region && college.region.toLowerCase() !== region.toLowerCase()) return false;
    if (institutionType && institutionType !== 'Any' && 
        college.institutionType.toLowerCase() !== institutionType.toLowerCase()) return false;

    // Category matching
    const collegeSeatType = (college.seatType || '').toUpperCase();
    if (!collegeSeatType.includes(category.toUpperCase())) return false;

    // Gender matching
    const collegeGender = college.gender || '';
    if (collegeGender !== 'Gender-Neutral' && 
        collegeGender !== gender &&
        !(collegeGender.includes('Female') && gender === 'Female-only (including Supernumerary)')) {
      return false;
    }

    return true;
  });

  // Map to final prediction shape
  const predictions = list.map(college => ({
    id: college.id,
    instituteName: college.institute,
    branch: college.academicProgram,
    institutionType: college.institutionType,
    openingRank: college.openingRank,
    closingRank: college.closingRank,
    year: college.year,
    round: college.round,
    state: college.state,
    region: college.region,
    appliedCutoff: college.closingRank,
    matchPercentage: calculateMatchPercentage(userRank, college, {state, region, institutionType}),
    eligibilityStatus: userRank <= college.closingRank ? 'Eligible' : 'Not Eligible',
    admissionChance: calculateAdmissionChance(userRank, college.closingRank)
  }));

  predictions.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return predictions;
}

function calculateMatchPercentage(userRank, college, filters) {
  let match = 0;
  const ratio = userRank / college.closingRank;

  if (ratio <= 0.8) match = 92 + Math.random() * 7;
  else if (ratio <= 1.0) match = 75 + Math.random() * 12;
  else if (ratio <= 1.2) match = 55 + Math.random() * 12;
  else if (ratio <= 1.5) match = 35 + Math.random() * 15;
  else match = 10 + Math.random() * 25;

  // Apply boosts
  if (filters.region && college.region.toLowerCase() === filters.region.toLowerCase()) match += 4;
  if (filters.state && college.state.toLowerCase() === filters.state.toLowerCase()) match += 3;
  if (filters.institutionType && college.institutionType.toLowerCase() === filters.institutionType.toLowerCase()) match += 3;

  return Math.max(0, Math.min(100, Math.round(match)));
}

function calculateAdmissionChance(userRank, closingRank) {
  const ratio = userRank / closingRank;
  if (ratio <= 0.8) return 'High';
  if (ratio <= 1.0) return 'Medium';
  return 'Low';
}