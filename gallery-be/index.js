import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import { v4 } from 'uuid';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Get all Photos
app.get('/photos', async (req, res) => {
  const photos = await getPhotosFromFile();
  res.status(200).json({ photos });
});

// Get Photos by Category
app.get('/photos/:categoryId', async (req, res) => {
  const photos = await getPhotosFromFile();

  const filteredPhotos = photos.filter(photo => photo.category === req.params.categoryId);

  if (filteredPhotos.length === 0) {
    return res.status(400).json({ message: 'Category is empty or invalid' });
  }

  return res.status(200).json({ photos: filteredPhotos });
});

// Get all categories
app.get('/categories', async (req, res) => {
  const photos = await getPhotosFromFile();
  const categories = [...new Set(photos.map(photo => photo.category))];
  return res.status(200).json({ categories });
});

// Get single Photo
app.get('/photo/:photoId', async (req, res) => {
  const photos = await getPhotosFromFile();
  let photo = photos.find(p => p.id === req.params.photoId);

  photo = await populateCommentsWithUserData(photo);

  res.status(200).json({ photo });
});

// Add new comment
app.put('/comment/:photoId', async (req, res) => {
  const photos = await getPhotosFromFile();
  const photoIndex = photos.findIndex(p => p.id === req.params.photoId);

  if (photoIndex === -1) {
    return res.status(400).json({ message: `Couldn't find photo with id ${req.params.photoId}` });
  }

  const newComment = {
    "id": v4(),
    "userId": req.body.userId,
    "text": req.body.text,
    "name": req.body.name,
    "date": req.body.date
  };

  const updatedPhoto = { ...photos[photoIndex], "comments": [...photos[photoIndex].comments, newComment] };
  photos.splice(photoIndex, 1, updatedPhoto);

  await updatePhotosFile(photos);

  res.status(200).json({ updatedPhoto });
});

// Add new rating
app.put('/rating/:photoId', async (req, res) => {
  const photos = await getPhotosFromFile();
  const photoIndex = photos.findIndex(p => p.id === req.params.photoId);

  if (photoIndex === -1) {
    return res.status(400).json({ message: `Couldn't find photo with id ${req.params.photoId}` });
  }

  const userRatingIndex = photos[photoIndex].ratings.findIndex(rating => rating.userId === req.body.userId);

  const newRating = {
    "userId": req.body.userId,
    "rating": req.body.rating
  }

  let updatedPhoto;

  if (userRatingIndex !== -1) {
    photos[photoIndex].ratings.splice(userRatingIndex, 1, newRating);
    updatedPhoto = { ...photos[photoIndex], "ratings":  photos[photoIndex].ratings};
  } else {
    updatedPhoto = { ...photos[photoIndex], "ratings": [...photos[photoIndex].ratings, newRating] };
  }

  photos.splice(photoIndex, 1, updatedPhoto);

  await updatePhotosFile(photos);
  return res.status(200).json({ updatedPhoto });
});

// Add photo details
app.put('/photo/:photoId', async (req, res) => {
  const photos = await getPhotosFromFile();
  const photoIndex = photos.findIndex(p => p.id === req.params.photoId);

  if (photoIndex === -1) {
    return res.status(404).json({ message: `Couldn't find photo with id ${req.params.photoId}` });
  }

  const newData = {
    description: req.body.description,
    title: req.body.title
  }

  const updatedPhoto = {...photos[photoIndex], ...newData};

  photos.splice(photoIndex, 1, updatedPhoto);
  await updatePhotosFile(photos);
  return res.status(200).json({updatedPhoto});
});

// Add new user
app.post('/user', async (req, res) => {
  const users = await getUsersFromFile();

  const newUser = {
    id: v4(),
    avatar: "",
    name: ""
  };

  const updatedUsers = [...users, newUser];
  await updateUsersFile(updatedUsers);
  return res.status(200).json({ id: newUser.id });
});

// Update user data
app.put('/user/:userId', async (req, res) => {
  const users = await getUsersFromFile();
  const userIndex = users.findIndex(u => u.id === req.params.userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: `Couldn't find user with id ${req.params.userId}` });
  }

  const updatedUser = {
    id: users[userIndex].id,
    name: req.body.name ?? users[userIndex].name,
    avatar: req.body.avatar ?? users[userIndex].avatar 
  };

  users.splice(userIndex, 1, updatedUser);
  await updateUsersFile(users);
  return res.status(200).json({ updatedUser });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3001);

// Helper Functions

async function getPhotosFromFile() {
  const file = await fs.readFile('./data/photos.json');
  return JSON.parse(file);
}

async function updatePhotosFile(newPhotos) {
  await fs.writeFile('./data/photos.json', JSON.stringify(newPhotos, null, 4));
}

async function getUsersFromFile() {
  const file = await fs.readFile('./data/users.json');
  return JSON.parse(file);
}

async function updateUsersFile(newUsers) {
  await fs.writeFile('./data/users.json', JSON.stringify(newUsers, null, 4));
}

async function populateCommentsWithUserData(photo) {
  const users = await getUsersFromFile();

  const updatedComments = [...photo.comments];
  photo.comments.forEach((comment, index) => {
    const commentUserIndex = users.findIndex(u => u.id === comment.userId);

    if (commentUserIndex === -1) {
      // This should not ever happen
      return res.status(404).json({ message: `Couldn't find user with id ${comment.userId}`});
    }

    updatedComments[index].name = users[commentUserIndex].name;
    updatedComments[index].avatar = users[commentUserIndex].avatar;
  });

  return { ...photo, comments: updatedComments };
}