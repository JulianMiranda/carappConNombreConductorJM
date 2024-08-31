import {Theme} from '@react-navigation/native';

type ThemeAction = {type: 'set_light_theme'} | {type: 'set_dark_theme'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
  tabColor: string;
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  dividerColor: 'rgba(0,0,0, 0.6)',
  tabColor: 'rgba(255,255,255, 0.92)',

  colors: {
    primary: '#E10032',
    background: 'white',
    card: '#2684FD',
    text: 'black',
    border: 'black',
    notification: 'teal',
  },
};

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  dividerColor: 'rgba(255,255,255, 0.6)',
  tabColor: 'rgba(0,0,0, 0.92)',
  colors: {
    primary: '#b80204',
    background: 'black',
    card: '#2684FD',
    text: 'white',
    border: 'black',
    notification: 'teal',
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightTheme};

    case 'set_dark_theme':
      return {...darkTheme};

    default:
      return state;
  }
};
