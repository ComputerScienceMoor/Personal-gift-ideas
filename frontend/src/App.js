import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GiftList from './components/GiftList';
import GiftForm from './components/GiftForm';
import Filter from './components/Filter';
import QuickGiftFinder from './components/QuickGiftFinder';
import './App.css';

function App() {
  const [giftIdeas, setGiftIdeas] = useState([]);
  const [allGiftIdeas, setAllGiftIdeas] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllGiftIdeas();
    fetchOccasions();
  }, []);

  useEffect(() => {
    if (selectedOccasion === 'All') {
      setGiftIdeas(allGiftIdeas);
    } else {
      setGiftIdeas(allGiftIdeas.filter(gift => gift.occasion === selectedOccasion));
    }
  }, [selectedOccasion, allGiftIdeas]);

  const fetchAllGiftIdeas = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/gift-ideas');
      setAllGiftIdeas(response.data);
      setGiftIdeas(response.data);
    } catch (error) {
      console.error('Error fetching gift ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOccasions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/occasions');
      setOccasions(response.data);
    } catch (error) {
      console.error('Error fetching occasions:', error);
    }
  };

  const addGiftIdea = async (giftData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/gift-ideas', giftData);
      setAllGiftIdeas([response.data, ...allGiftIdeas]);
      fetchOccasions(); // Refresh occasions in case new one was added
    } catch (error) {
      console.error('Error adding gift idea:', error);
    }
  };

  const updateGiftIdea = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/gift-ideas/${id}`, updatedData);
      setAllGiftIdeas(allGiftIdeas.map(gift => 
        gift._id === id ? response.data : gift
      ));
    } catch (error) {
      console.error('Error updating gift idea:', error);
    }
  };

  const deleteGiftIdea = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/gift-ideas/${id}`);
      setAllGiftIdeas(allGiftIdeas.filter(gift => gift._id !== id));
    } catch (error) {
      console.error('Error deleting gift idea:', error);
    }
  };

  const handleFilterChange = (occasion) => {
    setSelectedOccasion(occasion);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎁 Gift Idea Organizer</h1>
        <p>Organize your gift ideas by person and occasion</p>
      </header>
      
      <main className="App-main">
        <div className="form-section">
          <GiftForm onSubmit={addGiftIdea} />
        </div>
        
        <div className="filter-section">
          <Filter 
            occasions={occasions} 
            selectedOccasion={selectedOccasion}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="quick-finder-section">
          <QuickGiftFinder giftIdeas={allGiftIdeas} />
        </div>
        
        <div className="list-section">
          {loading ? (
            <p>Loading gift ideas...</p>
          ) : (
            <GiftList 
              giftIdeas={giftIdeas}
              onUpdate={updateGiftIdea}
              onDelete={deleteGiftIdea}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
