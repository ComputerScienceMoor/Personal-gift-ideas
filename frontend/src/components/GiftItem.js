import React, { useState } from 'react';

const GiftItem = ({ gift, isEditing, onEdit, onUpdate, onDelete }) => {
  const [editData, setEditData] = useState({
    name: gift.name,
    idea: gift.idea,
    occasion: gift.occasion,
    relationship: gift.relationship || 'Friend'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editData);
  };

  const handleCancel = () => {
    setEditData({
      name: gift.name,
      idea: gift.idea,
      occasion: gift.occasion,
      relationship: gift.relationship || 'Friend'
    });
    onEdit();
  };

  if (isEditing) {
    return (
      <div className="gift-item">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`edit-name-${gift._id}`}>Person's Name</label>
            <input
              type="text"
              id={`edit-name-${gift._id}`}
              name="name"
              value={editData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-relationship-${gift._id}`}>Relationship</label>
            <select
              id={`edit-relationship-${gift._id}`}
              name="relationship"
              value={editData.relationship}
              onChange={handleChange}
              required
            >
              <option value="Wife">Wife</option>
              <option value="Husband">Husband</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`edit-occasion-${gift._id}`}>Occasion</label>
            <select
              id={`edit-occasion-${gift._id}`}
              name="occasion"
              value={editData.occasion}
              onChange={handleChange}
              required
            >
              <option value="Birthday">Birthday</option>
              <option value="Christmas">Christmas</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Graduation">Graduation</option>
              <option value="Valentine's Day">Valentine's Day</option>
              <option value="Mother's Day">Mother's Day</option>
              <option value="Father's Day">Father's Day</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`edit-idea-${gift._id}`}>Gift Idea</label>
            <textarea
              id={`edit-idea-${gift._id}`}
              name="idea"
              value={editData.idea}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="gift-item">
      <h3>{gift.name}</h3>
      <div className="tags">
        <span className="occasion">{gift.occasion}</span>
        {gift.relationship && <span className="relationship-tag">{gift.relationship}</span>}
      </div>
      <p className="idea">{gift.idea}</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default GiftItem;
