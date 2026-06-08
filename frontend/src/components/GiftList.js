import React, { useState } from 'react';
import GiftItem from './GiftItem';

const GiftList = ({ giftIdeas, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id === editingId ? null : id);
  };

  const handleUpdate = (id, data) => {
    onUpdate(id, data);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gift idea?')) {
      onDelete(id);
    }
  };

  // Filter gift ideas using React filter() method
  const filteredGiftIdeas = giftIdeas.filter(gift => gift !== null);

  if (filteredGiftIdeas.length === 0) {
    return (
      <div className="empty-state">
        <h3>No gift ideas found</h3>
        <p>Start by adding your first gift idea above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Gift Ideas ({filteredGiftIdeas.length})</h2>
      {filteredGiftIdeas.map((gift) => (
        <GiftItem
          key={gift._id}
          gift={gift}
          isEditing={editingId === gift._id}
          onEdit={() => handleEdit(gift._id)}
          onUpdate={(data) => handleUpdate(gift._id, data)}
          onDelete={() => handleDelete(gift._id)}
        />
      ))}
    </div>
  );
};

export default GiftList;
