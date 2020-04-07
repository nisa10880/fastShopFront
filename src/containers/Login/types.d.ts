import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface LoginState {
  readonly error: {};
  isAuthenticated: boolean;
  user: any;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type ContainerState = LoginState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
