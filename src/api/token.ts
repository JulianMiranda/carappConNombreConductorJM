import AsyncStorage from '@react-native-async-storage/async-storage';

let tokenInMemory: string | null = null;

const getToken = async () => {
  if (tokenInMemory) {
    return tokenInMemory;
  }

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      tokenInMemory = token;
      return token;
    }
  } catch (error) {
    console.error('Error al recuperar el token:', error);
  }
  return null;
};

const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    tokenInMemory = token;
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    tokenInMemory = null;
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};

export {getToken, setToken, removeToken};
