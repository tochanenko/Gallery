import { API_URL } from "./constants";

export async function getPhotosByCategory(categoryName) {
  const response = await fetch(`${API_URL}/photos/${categoryName}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cound not fetch photos' }), { status: 500 });
  } else {
    const resData = await response.json();
    return resData.photos;
  }
}

export async function authenticateUser(userUUID) {
  const response = userUUID
    ? await fetch(`${API_URL}/user/${userUUID}`)
    : await fetch(`${API_URL}/user`, { method: 'POST' });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not get user details' }), { status: 500 });
  } else {
    const resData = await response.json();
    return resData.user;
  }
}

export async function putNewRating(photoId, userId, newRating) {
  const response = await fetch(`${API_URL}/rating/${photoId}`, {
    method: 'PUT',
    body: JSON.stringify({ userId, rating: newRating }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not update rating' }), { status: 500 });
  } else {
    return await response.json();
  }
}

export async function putPhotoDetails(photoId, title, description) {
  const response = await fetch(`${API_URL}/photo/${photoId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not update photo details' }), { status: 500 });
  } else {
    return await response.json();
  }
}

export async function getPhotoById(photoId) {
  const response = await fetch(`${API_URL}/photo/${photoId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cound not fetch photo' }), { status: 500 });
  } else {
    const resData = await response.json();
    return resData.photo;
  }
}