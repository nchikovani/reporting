import {combineReducers} from 'redux';
import token from './token';
import modalWindow from './modalWindow';

export default combineReducers({
    token,
    modalWindow,
})