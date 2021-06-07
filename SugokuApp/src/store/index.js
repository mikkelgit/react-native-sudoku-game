import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import board from './reducers/board'
import leaderboard from './reducers/leaderboard'

const reducer = combineReducers({
    board,
    leaderboard
})

const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default store