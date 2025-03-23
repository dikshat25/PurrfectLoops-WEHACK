// Registration.jsx
import React, { useState } from 'react';
import '../styles/loginsignupprofile.css';
const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    currentRole: '',
    experience: '',
    skills: [],
    newSkill: '',
    resume: null,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [skillLevel, setSkillLevel] = useState('Beginner');
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const addSkill = () => {
    if (formData.newSkill.trim() !== '') {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: formData.newSkill, level: skillLevel }],
        newSkill: ''
      });
      setSkillLevel('Beginner');
    }
  };
  
  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log("Form data submitted:", formData);
      // Here you would typically send the data to your backend
      alert("Registration successful! Redirecting to your profile...");
    } else {
      // Form has errors
      setErrors(formErrors);
    }
  };
  
  return (
    <div className="registration-container">
      <div className="form-header">
        <h1>Join Skill Hiring Platform</h1>
        <p>Create your profile and showcase your skills to top employers</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Professional Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentRole">Current Role</label>
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select Experience</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Skills</label>
            <div className="skills-input-container">
              <input
                type="text"
                id="newSkill"
                name="newSkill"
                value={formData.newSkill}
                onChange={handleChange}
                placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              />
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button type="button" onClick={addSkill} className="add-skill-btn">Add</button>
            </div>
            
            <div className="skills-list">
              {formData.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <span>{skill.name} - {skill.level}</span>
                  <button type="button" onClick={() => removeSkill(index)} className="remove-skill-btn">×</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
            {formData.resume && <p className="file-selected">Selected: {formData.resume.name}</p>}
          </div>
        </div>
        
        <div className="form-group terms">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className={errors.agreeTerms ? "error" : ""}
          />
          <label htmlFor="agreeTerms">I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></label>
          {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Account</button>
          <p className="login-link">Already have an account? <a href="#">Log in</a></p>
        </div>
      </form>
    </div>
  );
};

export default Registration;