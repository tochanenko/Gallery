import { FIREBASE_URL } from "./secret";
const LOCAL_URL = "http://localhost:3001";

const USE_LOCAL = false;

export const PHOTO_URL = 'http://materials.tochanenko.com/gallery_photos';

export const API_URL = USE_LOCAL ? LOCAL_URL : FIREBASE_URL;

export const CATEGORIES = [
  {
    name: 'Animals',
    id: 'animals'
  },
  {
    name: 'City',
    id: 'city'
  },
  {
    name: 'Mountains',
    id: 'mountains'
  },
  {
    name: 'Flowers',
    id: 'flowers_plants'
  },
]