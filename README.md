# Gallery Project

**Author:** Vladyslav Tochanenko

**Tech Stack:** React on Frontend, Express on Backend

## Used libraries & intstruments

**Frontend**

1. [React](https://react.dev/) as a library for crating SPAs
2. [Redux](https://react-redux.js.org/) for managing state in app
3. [UUID](https://www.npmjs.com/package/uuid) for generating random UUID keys
4. [Motion Framer](https://motion.dev/) for animations
5. [Avatar Generator](https://www.npmjs.com/package/random-avatar-generator) for generating random avatars for users 

**Backend**

1. [Express](https://expressjs.com/) as a backend framework
2. [Firebase Cloud Functions](https://firebase.google.com/docs/functions) for deploying Express app
3. [Firebase Realtime Database](https://firebase.google.com/docs/database) for storing data that is being processed by the Express app

## Project Overview

**Pages**

<img src="https://materials.tochanenko.com/github/homepage.png">

_Homepage_

<img src="https://materials.tochanenko.com/github/category.png">

_Category Page_

<img src="https://materials.tochanenko.com/github/photo.png">

_Photo Page_

_Updates_ and _Privacy Policy & Terms of Use_ Pages are also available.

**Features**

<img src="https://materials.tochanenko.com/github/voting.png" width="512">

_Rating_ - you can leave rating for any photo using the 5-star rating system. Each user can vote only one using one device / browser.

<img src="https://materials.tochanenko.com/github/comments.png">

_Comments_ - you can preview and leave comments for any image. Before posting your first comment you should set a name, and you can change your avatar image by tapping on it. All avatars are generated randomly, so you can have fun looking for an image that suits you well!

_Photo Preview_ - you can tap on the photo on Photo page to explore it in zoomed in layout!

_User ID System_ - all users are given the UUID when they first visit the website. Each browser is considered as a separate user, so you can't login into the same account from two different browsers. This is an easy solution for implementing users that can be improved later.

_Slow Internet Optimisations_ - the project has a top loading bar that indicates when somethinng is being loaded or updated at the moment. Also skeleton preloaders are implemented for better visual apeeal when loading big requests or using slow Internet connection. Also Error pages are implemented if there are some issues with backend deployment.

_Day and Night Themes_ - you can choose between Day, Night or Auto theme depending on your preferences. Theme toggle is located in a Header.

<img src="https://materials.tochanenko.com/github/mobile.png" width="256">

_Relative Layout_ - the project has relative layout so it can be used on devices of various sizes: Desktops, Tablets, and Phones.

## Experience the Project

You can experience the project in two ways:

1. By visiting the deployed version
2. By running Frontend and Backend locally

### Visit the Deployed version

The Frontend app is deployed on [gallery.tochanenko.com](https://gallery.tochanenko.com).

Backend Express app is deployed on Google Firebase using Firebase Functions and Firebase Realtime Database.

### Run Project Locally

For local testing, it’s recommended to use JSON files as the backend. The backend provided in the `gallery-be` folder already uses local JSON files by default. This means you can test the app locally without affecting any real data or breaking anything.

#### Run Frontend

**1. Go into Frontend directory**

```sh
cd gallery-fe
```

**2. Run React app**

```sh
npm run start
```


#### Run Backend

To test the project locally change the value of `USE_LOCAL` constant in `./gallery-fe/src/lib/constants.js` file to `true`.

**1. Go into Backend directory**

```sh
cd gallery-be
```
**2. Install Node modules**

```sh
npm install
```

**3. Run Express.js server**

```sh
node index.js
```

## Future improvements

This is my first project using React library. While writing this project I already refactored a couple of components and changes some approaches regarding the app structure or the way I handle data.

This project could also use some improvements from the technical side:

1. Query caching using the React Query library
2. Creating separate `Card.Title` and `Card.Content` components for `Card` component for easier use and better architecture of it
3. Making more intuitive animations without using Motion-Framer
4. User Identification and Authentication system so users will be able to access their account from different browsers and devices