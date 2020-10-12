import React, {createContext, useContext, useReducer} from 'react';

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
    default:
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

const AuthDispatchContext = createContext<Dispatch>(()=>{
  return {type: 'COMPLETE_LOGOUT'};
});

/**
 * 自作hooks
 *
 * @return {State} アプリの状態
 */
export const useAuthState = (): State => {
  const context = useContext(AuthStateContext);
  return context;
};

/**
 * 自作hooks
 *
 * @return {Dispatch | undefined} ディスパッチャ
 */
export const useAuthDispatch = (): Dispatch => {
  const context = useContext(AuthDispatchContext);
  return context;
};
interface Props {
    readonly children: React.ReactNode;
  }

const AuthProvider: React.FC<Props> = ({children}:Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    status: 'Loading',
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
export default AuthProvider;
