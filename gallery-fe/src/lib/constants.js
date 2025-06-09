import { FIREBASE_URL } from "./secret";

export const VERSION = "v1.0.1";

const LOCAL_URL = "http://localhost:3001";

const USE_LOCAL = true;

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
];

export const LOCAL_USER_UUID = "userUUID";
export const LOCAL_THEME_MODE = "localThemeMode";
export const LOCAL_THEME = "localTheme";