import { combineReducers } from 'redux';
import signin from '../features/login/signinSlice';
import character from '../features/character/characterSlice';
import episode from '../features/character/episodeSlice';
import location from '../features/location/locationSlice';

const rootReducer = combineReducers({
    signin,
    character,
    episode,
    location
})

export default rootReducer