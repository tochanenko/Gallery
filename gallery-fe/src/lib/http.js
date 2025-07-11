import store from "../store";
import { errorActions } from "../store/error";
import { progressActions } from "../store/progress";
import { API_URL } from "./constants";

async function fetchWithLoading({
  url,
  params = {},
  errorMessage = 'Could not fetch',
  errorCode = 500
}) {
  store.dispatch(progressActions.setLoading(true));

  try {
    const response = await fetch(url, params);

    if (!response.ok) {
      store.dispatch(progressActions.setLoading(false));
      store.dispatch(errorActions.addError({
        message: errorMessage
      }));
      // throw new Response(JSON.stringify({ message: errorMessage }), { status: errorCode });
      store.dispatch(errorActions.setError("404"));
      console.log("Error set");
    }

    return await response.json();
  } catch (e) {
    store.dispatch(errorActions.addError({
      message: errorMessage
    }));
    store.dispatch(errorActions.setError("500"));
  } finally {
    store.dispatch(progressActions.setLoading(false));
  }
}

export async function getPhotosByCategory(categoryName) {
  return fetchWithLoading({
    url: `${API_URL}/photos/${categoryName}`,
    errorMessage: 'Cound not fetch photos'
  }).then(res => res ? res.photos : undefined);
}

export async function authenticateUser(userUUID) {
  return fetchWithLoading({
    url: userUUID ? `${API_URL}/user/${userUUID}` : `${API_URL}/user`,
    params: userUUID ? {} : { method: "POST" },
    errorMessage: 'Could not get user details'
  }).then(res => res ? res.user : undefined);
}

export async function putNewRating(photoId, userId, newRating) {
  return fetchWithLoading({
    url: `${API_URL}/rating/${photoId}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ userId, rating: newRating }),
      headers: {
        'Content-Type': 'application/json',
      }
    },
    errorMessage: 'Could not update rating'
  });
}

export async function putPhotoDetails(photoId, title, description) {
  return fetchWithLoading({
    url: `${API_URL}/photo/${photoId}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    errorMessage: 'Could not update photo details'
  });
}

export async function getPhotoById(photoId) {
  return fetchWithLoading({
    url: `${API_URL}/photo/${photoId}`,
    errorMessage: 'Cound not fetch photo'
  }).then(res => res ? res.photo : undefined);
}

export async function putUpdateUserAvatar({ id, avatar }) {
  return fetchWithLoading({
    url: `${API_URL}/user/${id}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ avatar }),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    errorMessage: 'Could not update avatar'
  }).then(res => res ? res.user : undefined);
}

export async function putUpdateUserName({ id, name }) {
  return fetchWithLoading({
    url: `${API_URL}/user/${id}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    errorMessage: 'Could not update avatar'
  }).then(res => res ? res.user : undefined);
}

export async function putNewComment({ photoId, userId, text, date }) {
  return fetchWithLoading({
    url: `${API_URL}/comment/${photoId}`,
    params: {
      method: 'PUT',
      body: JSON.stringify({ userId, text, date }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    errorMessage: 'Could not add new comment'
  }).then(res => res ? res.photo : undefined);
}

export async function getRandomPhotos() {
  return fetchWithLoading({
    url: `${API_URL}/random`,
    errorMessage: 'Couold not fetch random photos'
  });
}