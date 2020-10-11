import {createContext, useContext} from 'react';

type State =
| { status: 'Unauthenticated'; token: string|undefined }
| { status: 'Loading';}
| { status: 'Authenticated'; token: string };

type Action =
| { type: 'START_LOGIN' }
| { type: 'COMPLETE_LOGIN'; token: string }
| { type: 'COMPLETE_LOGOUT' };

type Dispatch = (action: Action) => void
const authReducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'START_LOGIN':
      return {
        ...prevState,
        status: 'Loading',
      };
    case 'COMPLETE_LOGIN':
      return {
        ...prevState,
        status: 'Authenticated',
        token: action.token,
      };
    case 'COMPLETE_LOGOUT':
      return {
        ...prevState,
        status: 'Unauthenticated',
        token: undefined,
      };
  }
};
const AuthStateContext = createContext<State>({
  status: 'Unauthenticated',
  token: undefined,
});

const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);
export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  return context;
};
