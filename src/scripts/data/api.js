import CONFIG from "../config";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  PREDICT: `${CONFIG.BASE_URL}/predict`,
  PREDICTION_HISTORY: `${CONFIG.BASE_URL}/prediction-history`,
  DELETE_PREDICTION: `${CONFIG.BASE_URL}/prediction-history`,
  DELETE_PREDICTION_BY_ID: (id) => `${CONFIG.BASE_URL}/prediction-history/${id}`,
  GET_PROFILE: `${CONFIG.BASE_URL}/profile`,
  UPDATE_PROFILE: `${CONFIG.BASE_URL}/profile`,
  CHANGE_PASSWORD: `${CONFIG.BASE_URL}/change-password`,
  DELETE_ACCOUNT: `${CONFIG.BASE_URL}/account`,
};

export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

export async function login({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function getPredictionHistory(token) {
  const response = await fetch(ENDPOINTS.PREDICTION_HISTORY, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function deletePredictionHistory(token) {
  const response = await fetch(ENDPOINTS.DELETE_PREDICTION, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function deletePredictionById(id, token) {
  const response = await fetch(ENDPOINTS.DELETE_PREDICTION_BY_ID(id), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function predict(token, { name, gender, age, gpa, interestedDomain, projects, datascience, database, programming }) {
  const response = await fetch(ENDPOINTS.PREDICT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      gender,
      age,
      gpa,
      interestedDomain,
      projects,
      datascience,
      database,
      programming,
    }),
  });
  return response.json();
}

export async function getProfile(token) {
  const response = await fetch(ENDPOINTS.GET_PROFILE, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function updateProfile(token, { name, email, profilePic }) {
  const formData = new FormData();
  if (name) formData.append('name', name);
  if (email) formData.append('email', email);
  if (profilePic) formData.append('profilePic', profilePic);
  const response = await fetch(ENDPOINTS.UPDATE_PROFILE, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
}

export async function changePassword(token, { oldPassword, newPassword }) {
  const response = await fetch(ENDPOINTS.CHANGE_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return response.json();
}

export async function deleteAccount(token) {
  const response = await fetch(ENDPOINTS.DELETE_ACCOUNT, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}