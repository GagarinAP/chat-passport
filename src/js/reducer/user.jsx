import {ACTION_TYPES} from "./../constant/index"

const initialState = {
    user: {}
};

export function user (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_USER:
            return {user: action.user};
        case ACTION_TYPES.GET_USER:
            return {user: action.user};
        case ACTION_TYPES.CREATE_USER:
            return {user: action.user};
        case ACTION_TYPES.LOGOUT:
            return Object.assign({}, state, {user: action.user});
        default: return state
    }
}