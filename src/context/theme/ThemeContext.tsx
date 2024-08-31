import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {ThemeState, themeReducer, lightTheme, darkTheme} from './themeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}
const user = {theme: 'LIGHT'};

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {
  const [themeBackend, setThemeBackend] = useState('DEFAULT');

  const [theme, dispatch] = useReducer(
    themeReducer,
    themeBackend === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    if (user) {
      setThemeBackend(user.theme);
    }
  }, [user]);

  useEffect(() => {
    switch (user?.theme) {
      case 'DEFAULT':
        setLightTheme();
        break;
      /* case 'DEFAULT':
				Appearance.getColorScheme() === 'light'
					? setLightTheme()
					: setDarkTheme();
				break; */
      case 'DARK':
        setDarkTheme();
        break;
      case 'LIGHT':
        setLightTheme();
        break;
      default:
        break;
    }
  }, [user]);

  /* useEffect(() => {
		AppState.addEventListener('change', (status) => {
			if (status === 'active') {
				if (user?.theme === 'DEFAULT') {
					Appearance.getColorScheme() === 'light'
						? setLightTheme()
						: setDarkTheme();
				}
			}
		});
	}, [user]); */

  // SOLO EN IOS por ahora
  // useEffect(() => {

  // (colorScheme === 'light')
  //     ? setLightTheme()
  //     : setDarkTheme();

  // }, [colorScheme])

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
    console.log('setDarkTheme');
  };

  const setLightTheme = () => {
    dispatch({type: 'set_light_theme'});
    console.log('setLightTheme');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
