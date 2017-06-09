import axios from "axios"
import { ACTION_TYPES } from "./../constant/index"
import toastr from 'toastr'
import store from '../store/index'

export function loginUser (email, password) {
    return axios.post('/login',{
        email: email,
        password: password
    }).then( response => {
         if(typeof response.data === 'object') {
             return store.dispatch(_loginUser(response.data));
         } else {
            //toastr.error('Error');
         }
    }).then(
        //toastr.success('Login success')
    ).catch( error => {
        //return toastr.error(error);
    });
}
export function _loginUser (data) {
    return {
        type: ACTION_TYPES.LOGIN_USER,
        user: data
    };
}

export function getUser () {
    return axios.get('/profile')
        .then( response => {
            return store.dispatch(_getUser(response.data));
        }).catch( error => {
            //return toastr.error(error);
        });
}
export function _getUser (data) {
    return {
        type: ACTION_TYPES.GET_USER,
        user: data
    };
}

export function getAllUser () {
    return axios.get('/users')
        .then( response => {
            return store.dispatch(_getAllUser(response.data));
        }).catch( error => {
            //return toastr.error(error);
        });
}
export function _getAllUser (data) {
    return {
        type: ACTION_TYPES.GET_ALL_USER,
        users: data
    };
}

export function createUser (email, displayName, password) {
    return axios.post('/signup',{
            email: email,
            displayName: displayName,
            password: password
        }).then( response => {
            return store.dispatch(_createUser(response.data));
        }).then( response => {
            //return toastr.success('Signup success');
        }).catch( error => {
            //return toastr.error(error);
        });
}
export function _createUser (data) {
    return {
        type: ACTION_TYPES.CREATE_USER,
        user: data
    };
}

export function logoutUser () {
    return axios.get('/logout')
        .then( response => {
            return store.dispatch(_logoutUser(response.data));
        }).catch( error => {
            //return toastr.error(error);
        });
}
export function _logoutUser (data) {
    return {
        type: ACTION_TYPES.LOGOUT,
        user: data
    };
}

export function getRoomsUser () {
    return axios.get('/rooms')
        .then(response => {
            return store.dispatch(_getRoomsUser(response.data));
        }).catch( error => {
            //return toastr.error(error);
        });
}
export function _getRoomsUser (data) {
    return {
        type: ACTION_TYPES.GET_ROOMS,
        rooms: data
    };
}

export function addRoom (title) {
    return axios.post('/rooms',{
            title: title
        }).then(response => {
            if(typeof response.data === 'object') {
                return store.dispatch(_addRoom(response.data));
            } else {
                //toastr.error('Error');
            }
        }).then(
            //toastr.success('Room create')
        );
}
export function _addRoom (data) {
    return {
        type: ACTION_TYPES.ADD_ROOM,
        rooms: data
    };
}

export function deleteRoom (id) {
    return axios.delete(`/rooms/${id}`)
        .then(response => {
            return store.dispatch(_deleteRoom(response.data));
        }).then(
            //toastr.success('Room remove')
        );
}
export function _deleteRoom (data) {
    return {
        type: ACTION_TYPES.REMOVE_ROOM,
        rooms: data
    };
}

export function addMessage (id, send) {
    return axios.post(`/room/${id}/message`,{
        roomId: id,
        text: send
    }).then(response => {
        return store.dispatch(_addMessage(response.data));
    });
}
export function _addMessage (data) {
    return {
        type: ACTION_TYPES.ADD_MESSAGE,
        msg: data
    };
}

export function getMessageId (id) {
    return axios.get(`/room/${id}/message`)
            .then(response => {
                return store.dispatch(_getMessageId(response.data));
            }).catch( error => {
                //return toastr.error(error);
            });
}
export function _getMessageId (data) {
    return {
        type: ACTION_TYPES.GET_MESSAGE,
        messages: data
    };
}
