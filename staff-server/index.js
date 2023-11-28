const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory array to store profiles
let profiles = [];

// Get all profiles
app.get('/profiles', (req, res) => {
  res.json(profiles);
});

// Get a specific profile by ID
app.get('/profiles/:id', (req, res) => {
  const profileId = req.params.id;
  const profile = profiles.find((p) => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
});

// Add a new profile
app.post('/profiles', (req, res) => {
  const newProfile = req.body;
  profiles.push(newProfile);

  res.status(201).json({ message: 'Profile added successfully', profile: newProfile });
});

// Update an existing profile
app.put('/profiles/:id', (req, res) => {
  const profileId = req.params.id;
  const updatedProfile = req.body;
  const index = profiles.findIndex((p) => p.id === profileId);

  if (index === -1) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profiles[index] = updatedProfile;
  res.json({ message: 'Profile updated successfully', profile: updatedProfile });
});

// Delete a profile by ID
app.delete('/profiles/:id', (req, res) => {
  const profileId = req.params.id;
  profiles = profiles.filter((p) => p.id !== profileId);

  res.json({ message: 'Profile deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});