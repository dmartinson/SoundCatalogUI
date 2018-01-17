import {ADD_TOKEN, REMOVE_TOKEN} from './actions';

export interface IAppState {
    token: string;
}

export const INITIAL_STATE: IAppState = {
    token: null
};

export function rootReducer(state, action) {
    switch (action.type) {
        case ADD_TOKEN:
           // action.token.id = state.token.
           return Object.assign({}, state, {
               token: action.token
           });
        case REMOVE_TOKEN:
           return Object.assign({}, state, {
               token: null
           });
    }
    return state;
}
