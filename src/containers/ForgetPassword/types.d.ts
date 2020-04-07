import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface EventsState {}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type ContainerState = EventsState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
