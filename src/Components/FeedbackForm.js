import "../Styles/FeedbackForm.css";

import React, { useState } from "react";

import { Rating } from "@mui/material";

const FeedbackForm = () => {
  const [allData, setAllData] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: "",
  });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRating = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.name) formErrors.name = "Name is required";
    if (!form.email) formErrors.email = "Email is required";
    else if (!validateEmail(form.email))
      formErrors.email = "Invalid email format";
    if (form.rating === 0) formErrors.rating = "Rating is required";
    if (!form.comment) formErrors.comment = "Comment is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setAllData([...allData, form]);
    setForm({ name: "", email: "", comment: "", rating: 0 });
  };

  return (
    <div className="feedback-form">
      <div className="form">
        <p className="title">Feedback Form</p>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <p>
              Name<span>*</span>
            </p>
            <input
              placeholder="Enter your name"
              value={form.name}
              name="name"
              onChange={handleInput}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="content">
            <p>
              Email Id<span>*</span>
            </p>
            <input
              placeholder="Enter email id"
              value={form.email}
              name="email"
              onChange={handleInput}
            />
            {errors.email && <p className="error">{errors.email}</p>}{" "}
          </div>
          <div className="content">
            <p>
              Rating<span>*</span>
            </p>
            <div className="rating-star" value="rating">
              <Rating
                className="rating"
                value={form.rating}
                onChange={handleRating}
                defaultValue={0}
                precision={1}
                style={{ borderRadius: "50%" }}
              />
            </div>
            {errors.rating && <p className="error">{errors.rating}</p>}{" "}
          </div>
          <div className="content">
            <p>
              Comments<span>*</span>
            </p>
            <input
              placeholder="Comments"
              value={form.comment}
              name="comment"
              onChange={handleInput}
            />
            {errors.comment && <p className="error">{errors.comment}</p>}{" "}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>

      {allData.length > 0 && (
        <div className="submitted-data">
          <h1>Submitted Data:</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((data, i) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.rating}</td>
                  <td>{data.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
