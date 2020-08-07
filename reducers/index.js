import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import diary_cards from './diary_cards'

export default combineReducers({
    auth,
    user,
    diary_cards
})