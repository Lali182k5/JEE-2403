# Smart College Recommendation System

A modern, professional web application designed for **JEE aspirants** to get **personalized college recommendations** based on their **JEE rank, category, branch preference, and location**.

## 🎯 Features

### Core Features
- **Multi-step Prediction Form**: Collect user inputs (rank, category, gender, region, state, institution type, year, round)
- **Intelligent Matching**: Advanced algorithms calculate match percentages based on historical data
- **Dynamic Results Page**: Display predicted colleges with match percentages, cutoff info, and ranking
- **Filter and Sort Options**: Filter results by state, branch, match percentage, eligibility status
- **Interactive College Cards**: Show college details with match %, cutoff, and action buttons
- **Comparison Tool**: Side-by-side comparison of up to 3 colleges
- **Favorites System**: Save and revisit preferred colleges
- **PDF Report Generation**: Download comprehensive recommendation reports
- **Responsive Design**: Works smoothly on desktop, tablet, and mobile devices

### Pages Included
1. **Home Page (/)**: Hero section, features, testimonials, stats
2. **Prediction Tool (/predict)**: Multi-step form with validation
3. **Results (/results)**: Filtered college recommendations with pagination
4. **College Details (/college/:id)**: Detailed college information
5. **Compare (/compare)**: College comparison interface
6. **Favorites (/favorites)**: Saved colleges management
7. **Reports (/reports)**: Analytics and history
8. **About (/about)**: Mission, team, how it works
9. **Contact (/contact)**: Contact form and FAQ

## 🛠️ Tech Stack

- **Frontend**: React.js 18 (with Hooks and Context API)
- **Styling**: Pure CSS (CSS Variables, Flexbox, Grid)
- **Animations**: Framer Motion
- **Charts**: Chart.js with React-ChartJS-2
- **PDF Generation**: jsPDF
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Data**: Mock data with realistic college information

## 📁 Project Structure

```
smart-college-recommendation/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header/           # Navigation header
│   │   ├── Footer/           # Site footer
│   │   ├── CollegeCard/      # College display cards
│   │   └── FilterPanel/      # Results filtering
│   ├── context/              # React Context providers
│   │   ├── PredictionContext.jsx  # Prediction state management
│   │   └── FavoritesContext.jsx   # Favorites & comparison state
│   ├── data/                 # Mock data and utilities
│   │   └── mockData.js       # College data and form options
│   ├── pages/                # Page components
│   │   ├── Home/            # Landing page
│   │   ├── Predict/         # Multi-step prediction form
│   │   ├── Results/         # College recommendations
│   │   ├── About/           # About page
│   │   └── Contact/         # Contact page
│   ├── styles/              # Global styles
│   │   └── index.css        # CSS variables and base styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   # The project is already set up in the current directory
   cd smart-college-recommendation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb, #1e40af, #3b82f6)
- **Secondary**: Amber (#f59e0b, #d97706)
- **Accent**: Emerald (#10b981, #059669)
- **Grays**: Comprehensive gray scale from 50-900
- **Status**: Success, Warning, Error, Info colors

### Typography
- **Primary Font**: Inter (headings, UI elements)
- **Secondary Font**: Open Sans (body text)
- **Font Sizes**: Responsive scale from xs (0.75rem) to 6xl (3.75rem)

### Components
- **Buttons**: Primary, secondary, with hover states
- **Forms**: Styled inputs, selects, validation states
- **Cards**: College cards, stat cards, feature cards
- **Navigation**: Header with dropdown, mobile menu
- **Modals**: For detailed views and confirmations

## 📊 Data Structure

### College Object
```javascript
{
  id: 'unique-id',
  name: 'Full College Name',
  shortName: 'Short Name',
  type: 'IIT|NIT|IIIT|GFTI',
  state: 'State Name',
  region: 'North|South|East|West|North-East',
  branch: 'Branch Name',
  cutoff: {
    open: 142,
    ews: 210,
    'obc-ncl': 389,
    sc: 856,
    st: 445
  },
  fees: { tuition, hostel, mess, total },
  placement: { averagePackage, highestPackage, placementRate, topRecruiters },
  ranking: { nirf, nirfEngineering, qsWorld },
  facilities: [...],
  // ... more properties
}
```

### Prediction Result
- Original college data plus:
- `matchPercentage`: Calculated match score (0-100)
- `appliedCutoff`: Cutoff for user's category
- `eligibilityStatus`: 'Eligible' or 'Not Eligible'
- `admissionChance`: 'High', 'Medium', or 'Low'

## 🔧 Configuration

### Form Options
The application supports the following input parameters:
- **Categories**: OPEN, OBC-NCL, SC, ST, EWS
- **Gender**: Gender-Neutral, Female-only
- **Rounds**: 1-6
- **Years**: 2021-2024
- **Institution Types**: IIT, NIT, IIIT, GFTI
- **Regions**: North, South, East, West, North-East
- **States**: All Indian states and UTs

### Mock Data
- 5+ sample colleges with comprehensive information
- Realistic cutoff data and placement statistics
- Form validation and error handling
- Prediction algorithm with weighted factors

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

Key responsive features:
- Collapsible navigation menu
- Stacked layouts on mobile
- Touch-friendly buttons and forms
- Optimized typography scales
- Mobile-first approach

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🔮 Future Enhancements

### Planned Features
1. **Real API Integration**: Connect to live college database
2. **User Authentication**: Save preferences and history
3. **Advanced Analytics**: Detailed trend analysis and predictions
4. **Mobile App**: React Native version
5. **Counseling Integration**: Connect with education counselors
6. **College Reviews**: Student reviews and ratings
7. **Application Tracking**: Track application status
8. **Scholarship Information**: Scholarship opportunities
9. **Career Guidance**: Career path recommendations
10. **Alumni Network**: Connect with alumni

### Technical Improvements
- Progressive Web App (PWA) support
- Offline functionality
- Performance optimization
- SEO enhancements
- Automated testing
- CI/CD pipeline
- Docker containerization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@smartcollege.com or create an issue in the repository.

## 🙏 Acknowledgments

- Thanks to all JEE aspirants who inspired this project
- Educational institutions for providing admission data
- Open source community for amazing tools and libraries
- Design inspiration from modern educational platforms

---

**Made with ❤️ for JEE Aspirants**

*Empowering students to make informed decisions about their engineering education journey.*