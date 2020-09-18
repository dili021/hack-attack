import 'regenerator-runtime';

const fetch = require('node-fetch');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jj27ORefz8ab8qxicAWp/scores';

export const setScore = async (user = 'player', score = 0) => {
  const info = {
    user,
    score,
  };
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  };
  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const getScore = async () => {
  try {
    const response = await fetch(url,
      { mode: 'cors' });
    const data = await response.json();
    return data.result;
  } catch (e) {
    return e;
  }
};