# Gift Idea Organizer

A personal gift idea organizer built with React, Node.js, and MongoDB. Track gift ideas for different people and occasions with filtering capabilities.

## Features

- 🎁 Add gift ideas with person's name, gift idea, and occasion
- 📋 Filter gift ideas by occasion using React filter()
- ✏️ Edit existing gift ideas
- 🗑️ Delete gift ideas
- 🎨 Modern, responsive UI design
- 📱 Mobile-friendly interface

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running on localhost:27017

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd gift-idea-organizer
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## API Endpoints

### Gift Ideas
- `GET /api/gift-ideas` - Get all gift ideas (supports ?occasion filter)
- `POST /api/gift-ideas` - Create a new gift idea
- `PUT /api/gift-ideas/:id` - Update a gift idea
- `DELETE /api/gift-ideas/:id` - Delete a gift idea

### Occasions
- `GET /api/occasions` - Get all unique occasions

## Data Structure

Each gift idea contains:
- `name`: Person's name (String, required)
- `idea`: Gift idea description (String, required)
- `occasion`: Occasion type (String, required)
- `createdAt`: Creation timestamp (Date, auto-generated)

## Available Occasions

- Birthday
- Christmas
- Anniversary
- Wedding
- Graduation
- Valentine's Day
- Mother's Day
- Father's Day
- Other

## Usage

1. **Add a gift idea:** Fill out the form with person's name, gift idea, and occasion
2. **Filter by occasion:** Click on occasion buttons to filter the list
3. **Edit gift ideas:** Click the Edit button on any gift item
4. **Delete gift ideas:** Click the Delete button to remove a gift idea

## Project Structure

```
gift-idea-organizer/
├── backend/
│   ├── models/
│   │   └── GiftIdea.js     # MongoDB schema
│   ├── package.json
│   ├── server.js           # Express server
│   └── .env                # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Filter.js   # Occasion filter component
│   │   │   ├── GiftForm.js # Add gift form
│   │   │   ├── GiftItem.js # Individual gift item
│   │   │   └── GiftList.js # List of gifts with filtering
│   │   ├── App.css         # Main styles
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── package.json
└── README.md
```

## Filtering Implementation

The application uses React's `filter()` method to filter gift ideas by occasion:

```javascript
const filteredGiftIdeas = giftIdeas.filter(gift => gift !== null);
```

Backend filtering is also implemented for performance:

```javascript
const { occasion } = req.query;
let query = {};

if (occasion && occasion !== 'All') {
  query.occasion = occasion;
}

const giftIdeas = await GiftIdea.find(query);
```
