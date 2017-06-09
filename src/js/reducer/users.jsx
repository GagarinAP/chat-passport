import {ACTION_TYPES} from "./../constant/index"

const initialState = {
    users: {}
};

export function users (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_USER:
            return {users: action.users};
        default: return state
    }
}