import {User} from '../../interfaces/User.interface';

export interface ChatState {
  users: User[] | null;
}

type ChatAction = {type: 'load-users'; payload: {users: User[]}};

export const chatReducer = (
  state: ChatState,
  action: ChatAction,
): ChatState => {
  switch (action.type) {
    case 'load-users':
      return {
        ...state,
        users: action.payload.users,
      };

    default:
      return state;
  }
};
