import {ACTION_TYPES} from "./../constant/index"

const initialState = {
    messages: {}
};

export function messages (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_MESSAGE:
            return Object.assign({}, state, {messages: action.messages});
        case ACTION_TYPES.ADD_MESSAGE:
            return Object.assign({}, state, {messages: action.messages});
        default: return state
    }
}