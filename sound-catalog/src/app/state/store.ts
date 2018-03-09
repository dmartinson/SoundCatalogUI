import {ADD_USER, REMOVE_USER} from './actions';
import { AuthorizedUser } from '../shared/models/authorizedUser';
import { JwtHelper } from 'angular2-jwt';

export interface IAppState {
    user: AuthorizedUser;
}

export const INITIAL_STATE: IAppState = {
    user: null
};

export function rootReducer(state, action) {
    switch (action.type) {
        case ADD_USER:
           return Object.assign({}, state, {
               user: action.user
           });
        case REMOVE_USER:
           return Object.assign({}, state, {
               user: null
           });
    }
    return state;
}
