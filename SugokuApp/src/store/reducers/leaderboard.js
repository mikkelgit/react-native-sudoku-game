import {
    ADD_LEADERBOARD_LIST
} from '../action'

const initialState = {
    list: [
        {
            username: 'Admin',
            difficulty: 'hard',
            solveTimeInSecond: 1800
        }
    ]
}

function leaderboard (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_LEADERBOARD_LIST:
            return { list: state.list.concat(payload) }
        default:
            return state
    }
}

export default leaderboard