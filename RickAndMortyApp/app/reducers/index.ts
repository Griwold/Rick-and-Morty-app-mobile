import { combineReducers } from 'redux';
import signin from '../features/login/signinSlice';
import character from '../features/character/characterSlice';

const rootReducer = combineReducers({
    signin,
    character
})

export default rootReducer