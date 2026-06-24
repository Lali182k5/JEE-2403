import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePrediction } from '../../context/PredictionContext'
import './Home.css'

const Home = () => {
  const [quickRank, setQuickRank] = useState('')
  const navigate = useNavigate()
  const { updateFormField } = usePrediction()

  const handleQuickPredict = (e) => {
    e.preventDefault()
    if (quickRank.trim()) {
      updateFormField('jeeRank', quickRank.trim())
      navigate('/predict')
    }
  }

  const stats = [
    { number: '10,000+', label: 'Students Helped', icon: '👨‍🎓' },
    { number: '500+', label: 'Colleges Covered', icon: '🏛️' },
    { number: '95%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '24/7', label: 'Support Available', icon: '🕐' }
  ]

  const features = [
    {
      icon: '🔍',
      title: 'Smart Matching',
      description: 'Advanced algorithms analyze your profile and match you with the best colleges based on your JEE rank, category, and preferences.'
    },
    {
      icon: '📊',
      title: 'Data-Driven Insights',
      description: 'Access comprehensive cutoff data, placement statistics, and college rankings to make informed decisions.'
    },
    {
      icon: '🎯',
      title: 'Personalized Recommendations',
      description: 'Get tailored college suggestions that consider your academic profile, location preferences, and career goals.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Results',
      description: 'Instant predictions with detailed match percentages and admission probability analysis.'
    },
    {
      icon: '📈',
      title: 'Trend Analysis',
      description: 'Stay updated with historical cutoff trends and admission patterns to predict future requirements.'
    },
    {
      icon: '🤝',
      title: 'Expert Guidance',
      description: 'Access expert insights and guidance to navigate the complex college admission process with confidence.'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      rank: 'JEE Rank: 2,456',
      college: 'IIT Bombay - CSE',
      image: '/assets/testimonials/priya.jpg',
      quote: 'The predictions were incredibly accurate! I got admission exactly where the system predicted with 92% match.'
    },
    {
      name: 'Rahul Patel',
      rank: 'JEE Rank: 8,234',
      college: 'NIT Trichy - ECE',
      image: '/assets/testimonials/rahul.jpg',
      quote: 'This platform saved me so much time and confusion. The detailed analysis helped me make the right choice.'
    },
    {
      name: 'Sneha Reddy',
      rank: 'JEE Rank: 15,678',
      college: 'IIIT Hyderabad - CSE',
      image: '/assets/testimonials/sneha.jpg',
      quote: 'The comparison feature was amazing. I could easily compare different colleges and make an informed decision.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-text" variants={itemVariants}>
              <h1 className="hero-title">
                Find Your Perfect
                <span className="highlight"> Engineering College</span>
              </h1>
              <p className="hero-description">
                Get personalized college recommendations based on your JEE rank, category, 
                and preferences. Make informed decisions with our intelligent prediction system.
              </p>
            </motion.div>

            <motion.div className="hero-quick-predict" variants={itemVariants}>
              <form onSubmit={handleQuickPredict} className="quick-predict-form">
                <h3>Quick Prediction</h3>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="Enter your JEE Main rank"
                    value={quickRank}
                    onChange={(e) => setQuickRank(e.target.value)}
                    className="rank-input"
                    min="1"
                    max="1000000"
                  />
                  <button type="submit" className="predict-btn">
                    Get Predictions
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <p className="quick-predict-note">
                  Enter your rank to get instant college recommendations
                </p>
              </form>
            </motion.div>

            <motion.div className="hero-cta" variants={itemVariants}>
              <Link to="/predict" className="btn btn-primary btn-large">
                Start Detailed Analysis
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="stat-card" variants={itemVariants}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose Smart College Recommendation?</h2>
            <p>Discover the powerful features that make college selection easier and more accurate</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="feature-card" variants={itemVariants}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How It Works</h2>
            <p>Simple steps to get your personalized college recommendations</p>
          </motion.div>

          <motion.div
            className="steps-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Enter Your Details</h3>
                <p>Provide your JEE rank, category, gender, preferred region, and other preferences.</p>
              </div>
            </div>

            <div className="step-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12h36M26 2l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Our intelligent system analyzes historical cutoff data, admission trends, and your profile to generate predictions.</p>
              </div>
            </div>

            <div className="step-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12h36M26 2l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Results</h3>
                <p>Receive personalized college recommendations with match percentages, cutoff analysis, and detailed insights.</p>
              </div>
            </div>

            <div className="step-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M2 12h36M26 2l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Make Your Choice</h3>
                <p>Compare colleges, save favorites, and make informed decisions about your future.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Success Stories</h2>
            <p>See how we've helped thousands of students find their perfect college match</p>
          </motion.div>

          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="testimonial-card" variants={itemVariants}>
                <div className="testimonial-content">
                  <div className="quote-icon">💬</div>
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonial.image} alt={testimonial.name} onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }} />
                    <div className="avatar-placeholder" style={{display: 'none'}}>
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p className="author-rank">{testimonial.rank}</p>
                    <p className="author-college">{testimonial.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Find Your Perfect College?</h2>
            <p>Join thousands of successful students who found their ideal engineering college with our smart recommendation system.</p>
            <div className="cta-buttons">
              <Link to="/predict" className="btn btn-primary btn-large">
                Start Your Journey
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Get Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home