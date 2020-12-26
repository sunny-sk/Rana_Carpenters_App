import Url from './url';

export const loginUser = async (data) => {
  try {
    const { email, password } = data;
    let result = await fetch(Url._login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};

export const registerUser = async (data) => {
  try {
    const { name, email, password } = data;
    let result = await fetch(Url._register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};

export const getAllProducts = async () => {
  try {
    let result = await fetch(Url._getAllProducts, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};
export const getAllCategories = async () => {
  try {
    let result = await fetch(Url._getAllCategories, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};
export const getAllDetails = async () => {
  try {
    let result = await fetch(Url._getDetails, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};

export const registerDeviceToGetNotifications = async (payload) => {
  try {
    let result = await fetch(Url._registerDeviceForNotification, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
    return result.json();
  } catch (error) {
    throw new Error('server error');
  }
};
