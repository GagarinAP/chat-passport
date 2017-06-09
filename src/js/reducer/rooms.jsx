import {ACTION_TYPES} from "./../constant/index"

const initialState = {
    rooms: {}
};

export function rooms (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ROOMS:
            return Object.assign({}, state, { rooms: action.rooms} );
        case ACTION_TYPES.ADD_ROOM:
            return Object.assign({}, state, {
                rooms: [
                    ...(state.rooms.filter(item => (item._id !== action.rooms._id))),
                    action.rooms
                ]
            });
        case ACTION_TYPES.REMOVE_ROOM:
            return Object.assign({}, state, {
                rooms: [
                    ...(state.rooms.filter(item => (item._id !== action.rooms._id))),
                ]});
        default: return state
    }
}