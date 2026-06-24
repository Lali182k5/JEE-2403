import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Accurate Predictions',
      description: 'Our algorithm analyzes historical cutoff data, admission trends, and your profile to provide highly accurate college recommendations with confidence scores.'
    },
    {
      icon: '📊',
      title: 'Data-Driven Insights',
      description: 'Access comprehensive data including placement statistics, fee structures, rankings, and student reviews to make informed decisions.'
    },
    {
      icon: '🔍',
      title: 'Smart Filtering',
      description: 'Advanced filtering options help you narrow down colleges based on location, branch, fees, rankings, and other preferences.'
    },
    {
      icon: '📈',
      title: 'Trend Analysis',
      description: 'Understand admission trends over years, cutoff variations, and predict future requirements with our analytical tools.'
    },
    {
      icon: '🤝',
      title: 'Personalized Experience',
      description: 'Every recommendation is tailored to your specific rank, category, preferences, and career goals for maximum relevance.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Updates',
      description: 'Our database is continuously updated with the latest admission information, ensuring you get current and relevant data.'
    }
  ]

  const team = [
  {
    name: 'Swathi Rajmundry',
    role: 'Team Lead',
    education: 'B.Tech Computer Science, SVEC Tadepalli',
    image: '/assets/team/swathi.jpg',
    bio: 'Visionary leader guiding the team towards building innovative educational platforms. Passionate about leveraging technology to enhance learning experiences.'
  },
  {
    name: 'Likhitha Sai Edupalli',
    role: 'Full Stack Developer',
    education: 'B.Tech Computer Science, SVEC Tadepalli',
    image: '/assets/team/likhitha.jpg',
    bio: 'Passionate developer specializing in modern web technologies and focused on building scalable applications with clean and efficient code.'
  },
  {
    name: 'Pravaliika Bitra',
    role: 'Frontend Developer',
    education: 'B.Tech Computer Science, SVEC Tadepalli',
    image: '/assets/team/pravaliika.jpg',
    bio: 'Creative front-end developer with a strong eye for design and user experience. Skilled in crafting responsive and engaging interfaces.'
  },
  {
    name: 'Mahesh Kumar Mekka',
    role: 'Backend Developer',
    education: 'B.Tech Computer Science, SVEC Tadepalli',
    image: '/assets/team/mahesh.jpg',
    bio: 'Backend specialist experienced in building secure and efficient RESTful APIs. Enthusiastic about database design and system optimization.'
  },
  {
    name: 'Bhavya Sri Appana',
    role: 'Data Analyst',
    education: 'B.Tech Computer Science, SVEC Tadepalli',
    image: '/assets/team/bhavya.jpg',
    bio: 'Data enthusiast skilled in transforming raw data into valuable insights. Focused on data-driven decision-making for product improvement.'
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
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About Smart College Recommendation System</h1>
            <p className="hero-description">
              Empowering JEE aspirants with intelligent, data-driven college recommendations 
              to make informed decisions about their engineering education journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <motion.div
              className="mission-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Our Mission</h2>
              <p>
                To democratize access to quality engineering education by providing every JEE aspirant 
                with personalized, accurate, and comprehensive college recommendations based on their 
                unique profile and preferences.
              </p>
              <p>
                We believe that every student deserves to find their perfect academic match - a college 
                that aligns with their abilities, aspirations, and circumstances. Our platform eliminates 
                the confusion and uncertainty in college selection by leveraging advanced analytics and 
                comprehensive data.
              </p>
            </motion.div>
            <motion.div
              className="mission-stats"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="stat-item">
                <div className="stat-number">25,000+</div>
                <div className="stat-label">Students Helped</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">800+</div>
                <div className="stat-label">Colleges Covered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Prediction Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years of Data</div>
              </div>
            </motion.div>
          </div>
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
            <h2>What Makes Us Different</h2>
            <p>Our platform combines cutting-edge technology with deep educational insights</p>
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
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How Our Algorithm Works</h2>
            <p>Understanding the science behind our recommendations</p>
          </motion.div>

          <div className="algorithm-steps">
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Data Collection</h3>
                <p>We collect and analyze historical cutoff data, admission statistics, placement records, and fee structures from 800+ engineering colleges across India.</p>
              </div>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Profile Analysis</h3>
                <p>Our system analyzes your JEE rank, category, gender, location preferences, and other factors to create a comprehensive profile.</p>
              </div>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Intelligent Matching</h3>
                <p>Advanced machine learning algorithms calculate match percentages by comparing your profile with historical admission patterns and success rates.</p>
              </div>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Personalized Results</h3>
                <p>You receive ranked recommendations with detailed insights, admission probabilities, and comprehensive college information to make informed decisions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Meet Our Team</h2>
            <p>Passionate educators and technologists working to transform college admissions</p>
          </motion.div>

          <motion.div
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} className="team-card" variants={itemVariants}>
                <div className="member-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-education">{member.education}</p>
                  <p className="member-experience">{member.experience}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div
            className="values-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>🎯 Accuracy</h3>
                <p>We are committed to providing the most accurate and reliable college recommendations based on comprehensive data analysis.</p>
              </div>
              <div className="value-item">
                <h3>🔒 Transparency</h3>
                <p>Our recommendation process is transparent. We clearly explain how each factor contributes to your college matches.</p>
              </div>
              <div className="value-item">
                <h3>🚀 Innovation</h3>
                <p>We continuously innovate our algorithms and platform to provide better insights and user experience.</p>
              </div>
              <div className="value-item">
                <h3>🤝 Accessibility</h3>
                <p>Quality educational guidance should be accessible to all. Our platform is free and available to every JEE aspirant.</p>
              </div>
              <div className="value-item">
                <h3>📚 Education First</h3>
                <p>We prioritize educational outcomes and student success over commercial interests in all our recommendations.</p>
              </div>
              <div className="value-item">
                <h3>🔄 Continuous Improvement</h3>
                <p>We constantly update our data and refine our algorithms based on user feedback and changing admission patterns.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About