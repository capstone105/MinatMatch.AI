import CONFIG from "../config";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  PREDICT: `${CONFIG.BASE_URL}/predict`,
  PREDICTION_HISTORY: `${CONFIG.BASE_URL}/prediction-history`,
  DELETE_PREDICTION: `${CONFIG.BASE_URL}/prediction-history`,
  DELETE_PREDICTION_BY_ID: (id) => `${CONFIG.BASE_URL}/prediction-history/${id}`,
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