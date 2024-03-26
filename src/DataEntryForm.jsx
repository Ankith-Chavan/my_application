import React, { useState } from "react";
import axios from "axios";
import "./DataEntryForm.css";

const DataEntryForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    city: "",
    phone: "",
    occupation: "",
    gender: "",
    zipcode: "",
    message: "",
    subscribe: false,
  });

  const [formErrors, setFormErrors] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    city: "",
    phone: "",
    occupation: "",
    gender: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.id) {
      errors.id = "Please provide an ID.";
      isValid = false;
    }

    if (!formData.name) {
      errors.name = "Please provide a valid name.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please provide a valid email.";
      isValid = false;
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 1 || formData.age > 150) {
      errors.age = "Please provide a valid age.";
      isValid = false;
    }

    if (!formData.city) {
      errors.city = "Please provide a city.";
      isValid = false;
    }

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = "Please provide a valid phone number.";
      isValid = false;
    }

    if (!formData.occupation) {
      errors.occupation = "Please provide an occupation.";
      isValid = false;
    }

    if (!formData.gender) {
      errors.gender = "Please select a gender.";
      isValid = false;
    }

    const zipcodeRegex = /^\d{5}$/;
    if (!formData.zipcode || !zipcodeRegex.test(formData.zipcode)) {
      errors.zipcode = "Please provide a valid ZIP code.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3002", formData);
        console.log(response.data);
        alert("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form");
      }
    } else {
      console.error("Form validation failed.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>DATA ENTRY APPLICATION</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="id">ID:</label>
              <input
                type="number"
                className={`form-control ${formErrors.id ? "is-invalid" : ""}`}
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                min="0"
              />
              {formErrors.id && <div className="invalid-feedback">{formErrors.id}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className={`form-control ${formErrors.age ? "is-invalid" : ""}`}
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="150"
              />
              {formErrors.age && <div className="invalid-feedback">{formErrors.age}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className={`form-control ${formErrors.city ? "is-invalid" : ""}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="occupation">Occupation:</label>
              <input
                type="text"
                className={`form-control ${formErrors.occupation ? "is-invalid" : ""}`}
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
              {formErrors.occupation && <div className="invalid-feedback">{formErrors.occupation}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="gender">Gender:</label>
              <select
                className={`form-control ${formErrors.gender ? "is-invalid" : ""}`}
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="zipcode">Zip Code:</label>
              <input
                type="text"
                className={`form-control ${formErrors.zipcode ? "is-invalid" : ""}`}
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
              {formErrors.zipcode && <div className="invalid-feedback">{formErrors.zipcode}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="message">Message:</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="yes"
                id="subscribe"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="subscribe">
                Subscribe to Newsletter
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataEntryForm;


