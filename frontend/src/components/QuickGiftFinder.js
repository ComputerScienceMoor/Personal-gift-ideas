import React, { useState } from 'react';

const QuickGiftFinder = ({ giftIdeas }) => {
  const [selectedOccasion, setSelectedOccasion] = useState('');

  // Get unique occasions from giftIdeas
  const occasions = [...new Set(giftIdeas.map(gift => gift.occasion))];

  const filteredGifts = giftIdeas.filter(gift => gift.occasion === selectedOccasion);

  return (
    <div className="quick-gift-finder">
      <h3>🔍 Quick Gift Finder</h3>
      <div className="form-group">
        <label htmlFor="finder-occasion">Select an Occasion:</label>
        <select 
          id="finder-occasion" 
          value={selectedOccasion} 
          onChange={(e) => setSelectedOccasion(e.target.value)}
        >
          <option value="">-- Select Occasion --</option>
          {occasions.map(occasion => (
            <option key={occasion} value={occasion}>{occasion}</option>
          ))}
        </select>
      </div>

      {selectedOccasion && (
        <div className="recommendations">
          {filteredGifts.length > 0 ? (
            filteredGifts.map((gift, index) => (
              <p key={gift._id || index} className="recommendation-msg">
                For the upcoming <strong>{selectedOccasion}</strong>, you should consider getting <strong>{gift.idea}</strong> for your <strong>{gift.relationship || 'friend'}</strong>, <strong>{gift.name}</strong>.
              </p>
            ))
          ) : (
            <p className="no-recommendations">No gift ideas found for this occasion.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickGiftFinder;
