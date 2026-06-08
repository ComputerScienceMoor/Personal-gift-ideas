import React, { useState } from 'react';

const RECOMMENDATION_MATRIX = {
  Wife: {
    Anniversary: ['Custom engraved jewelry box', 'A weekend spa getaway package', 'A preserved gold-dipped rose', 'Diamond stud earrings', 'Silk pajama set'],
    Birthday: ['Smart fitness watch', 'Designer handbag', 'Personalized photo album', 'Luxury perfume set', 'Gourmet cooking class'],
    Christmas: ['Cashmere sweater', 'Heated blanket', 'Espresso machine', 'Subscription box (beauty/wine)', 'Jewelry travel case'],
    "Valentine's Day": ['Preserved flower box', 'Lace lingerie set', 'Heart-shaped pendant', 'Chocolates & Champagne gift set', 'Couple\'s massage voucher']
  },
  Husband: {
    Anniversary: ['Engraved watch', 'Whiskey aging kit', 'Leather weekend bag', 'Smart home sound system', 'Custom portrait painting'],
    Birthday: ['Noise-cancelling headphones', 'Grill master tool set', 'New video game console', 'Beer brewing kit', 'Subscription box (snacks/tools)'],
    Christmas: ['High-quality flannel shirt', 'Portable car vacuum', 'Multi-tool pocket knife', 'Darn Tough socks set', 'Beard grooming kit'],
    "Valentine's Day": ['Personalized wallet', 'Date night jar', 'Massage gun', 'Custom comic book of your story', 'Premium coffee beans set']
  },
  Father: {
    "Father's Day": ['"Best Dad" custom hammer', 'Smart meat thermometer', 'Comfortable lawn chair', 'Personalized golf balls', 'Car detailing kit'],
    Birthday: ['Tablet for reading', 'Electric shaver', 'History book set', 'Comfortable slippers', 'Back massager'],
    Christmas: ['Weather station', 'Work bench organizer', 'Heated vest', 'Flashlight set', 'Digital photo frame']
  },
  Mother: {
    "Mother's Day": ['"Best Mom" locket', 'Self-watering indoor garden', 'Soft bathrobe', 'Birthstone jewelry', 'Tea sampler set'],
    Birthday: ['E-reader', 'Yoga mat & accessories', 'Skincare fridge', 'Custom family tree art', 'Weighted blanket'],
    Christmas: ['Air fryer', 'Essential oil diffuser', 'Electric kettle', 'Cozy throw blanket', 'Foot spa']
  },
  Friend: {
    Birthday: ['Funny board game', 'Portable Bluetooth speaker', 'Cocktail shaker set', 'Succulent plant collection', 'Reusable coffee cup'],
    Christmas: ['Hot sauce making kit', 'Portable power bank', 'Puzzle set', 'Scented candle', 'Movie night gift basket'],
    Graduation: ['Planner & stationery set', 'Inspirational desk art', 'Laptop sleeve', 'Travel mug', 'Coffee shop gift card']
  },
  Colleague: {
    Birthday: ['Desk organizer', 'Premium notebook', 'Insulated water bottle', 'Mini desk plant', 'USB mug warmer'],
    Christmas: ['Holiday treats basket', 'Touchscreen gloves', 'Desktop calendar', 'Gourmet coffee sampler', 'Office-friendly fidget toy'],
    Graduation: ['Professional portfolio', 'Leather business card holder', 'Quality pen set', 'Desk name plate', 'Productivity book']
  },
  Other: {
    Other: ['Gift card', 'Box of assorted chocolates', 'Fruit basket', 'Book of general interest', 'Bottle of wine']
  }
};

const GiftForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    idea: '',
    occasion: 'Birthday',
    relationship: 'Friend'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRandomIdea = (relationship, occasion) => {
    const relationshipIdeas = RECOMMENDATION_MATRIX[relationship] || RECOMMENDATION_MATRIX['Other'];
    const ideas = relationshipIdeas[occasion] || relationshipIdeas['Birthday'] || relationshipIdeas['Christmas'] || relationshipIdeas['Other'] || RECOMMENDATION_MATRIX['Other']['Other'];
    return ideas[Math.floor(Math.random() * ideas.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.occasion && formData.relationship) {
      const generatedIdea = getRandomIdea(formData.relationship, formData.occasion);
      const submissionData = {
        ...formData,
        idea: generatedIdea
      };
      onSubmit(submissionData);
      setFormData({
        name: '',
        idea: '',
        occasion: 'Birthday',
        relationship: 'Friend'
      });
    }
  };

  return (
    <div>
      <h2>Add New Gift Idea</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Person's Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter person's name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="relationship">Relationship</label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
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
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
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
          <label htmlFor="idea">Gift Idea (Auto-generated)</label>
          <textarea
            id="idea"
            name="idea"
            value="Automatic recommendations will be generated based on the occasion and relationship."
            disabled
            placeholder="Gift idea will be generated automatically..."
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Add Gift Idea
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiftForm;
