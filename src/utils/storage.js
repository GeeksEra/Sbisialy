import { AsyncStorage } from 'react-native';
const USER_TOKEN = 'USER_TOKEN'
const USER_SETTINGS = 'USER_SETTINGS'
const USER_CART = 'USER_CART'
const USER = 'USER'
export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};




export const setUser = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER}:key`, `${JSON.stringify(value)}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return '';
  } catch (error) {
    return '';
  }
};



export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_TOKEN}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const clearToken = async () => saveToken('');
export const clearUser = async () => setUser(undefined);

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_TOKEN}:key`);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const getSettings = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_SETTINGS}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null
  }
};

export const saveSettings = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_SETTINGS}:key`, `${JSON.stringify(value)}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const saveCart = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_CART}:key`, `${JSON.stringify(value)}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getCart = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_CART}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const clearCart = async () => saveCart([]);
