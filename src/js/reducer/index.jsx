import {combineReducers} from "redux"
import {user} from './user'
import {users} from './users'
import {rooms} from './rooms'
import {messages} from './messages'

const rootReducer = combineReducers({
    users,
    rooms,
    messages,
    user
});

export default rootReducer;