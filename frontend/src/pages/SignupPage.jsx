import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginsignupprofile.css';
// Icon components
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
    </svg>
);

const SignupPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState({});

    // Password strength criteria
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Calculate password strength
    const calculateStrength = () => {
        let strength = 0;
        if (hasMinLength) strength += 1;
        if (hasUpperCase) strength += 1;
        if (hasLowerCase) strength += 1;
        if (hasNumber) strength += 1;
        if (hasSpecialChar) strength += 1;

        if (strength <= 2) return { level: 'weak', color: '#ff4d4f' };
        if (strength <= 4) return { level: 'medium', color: '#faad14' };
        return { level: 'strong', color: '#52c41a' };
    };

    const strengthInfo = calculateStrength();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validation
        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit the form - replace with your registration logic
            console.log('Signup form submitted', { fullName, email, password });
            // Here you would typically call your registration API
            // Example (replace with your actual API call):
            /*
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle successful registration (e.g., redirect to login)
                    navigate('/login');
                } else {
                    // Handle registration error (e.g., display error message)
                    setErrors({ general: data.message });
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                setErrors({ general: 'An error occurred during registration' });
            });
            */
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h1>Create an Account</h1>
                <p className="subtitle">Please fill in the details to sign up</p>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={errors.fullName ? 'input-error' : ''}
                        />
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={errors.password ? 'input-error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}

                        {/* Password strength indicator */}
                        {password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div
                                        className="strength-indicator"
                                        style={{
                                            width: `${(calculateStrength().level === 'weak' ? 33 : calculateStrength().level === 'medium' ? 66 : 100)}%`,
                                            backgroundColor: strengthInfo.color
                                        }}
                                    ></div>
                                </div>
                                <span className="strength-text" style={{ color: strengthInfo.color }}>
                                    Password strength: {strengthInfo.level}
                                </span>

                                <div className="password-criteria">
                                    <div className={`criteria-item ${hasMinLength ? 'met' : ''}`}>
                                        {hasMinLength && <CheckIcon />} At least 8 characters
                                    </div>
                                    <div className={`criteria-item ${hasUpperCase ? 'met' : ''}`}>
                                        {hasUpperCase && <CheckIcon />} One uppercase letter
                                    </div>
                                    <div className={`criteria-item ${hasLowerCase ? 'met' : ''}`}>
                                        {hasLowerCase && <CheckIcon />} One lowercase letter
                                    </div>
                                    <div className={`criteria-item ${hasNumber ? 'met' : ''}`}>
                                        {hasNumber && <CheckIcon />} One number
                                    </div>
                                    <div className={`criteria-item ${hasSpecialChar ? 'met' : ''}`}>
                                        {hasSpecialChar && <CheckIcon />} One special character
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={errors.confirmPassword ? 'input-error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-group checkbox-group">
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="agree-terms"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                                className={errors.agreeTerms ? 'checkbox-error' : ''}
                            />
                            <label htmlFor="agree-terms">
                                I agree to the <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>
                            </label>
                        </div>
                        {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
                    </div>

                    <button type="submit" className="signup-button">
                        Create Account
                    </button>

                    <div className="social-signup">
                        <p className="social-text">Or sign up with</p>
                        <div className="social-buttons">
                            <button type="button" className="social-button">
                                <GoogleIcon /> Google
                            </button>
                            <button type="button" className="social-button">
                                <FacebookIcon /> Facebook
                            </button>
                        </div>
                    </div>

                    <p className="login-link">
                        Already have an account?
                        <span className="login-link-text" onClick={() => navigate('/')}>
                            Sign in
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;