import {
    SET_BOARD,
    SET_INITIAL_BOARD,
    UPDATE_BOARD_LOADING,
    UPDATE_BOARD_SOLVED_STATUS,
    SET_VALIDATING_STATUS
} from '../action'

const intialState = {
    board: [],
    loading: true,
    initialBoard: [],
    solved: false,
    isValidating: false,
}

function board (state = intialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_BOARD:
            return { ...state, board: payload }
        case SET_INITIAL_BOARD:
            return { ...state, initialBoard: payload }
        case UPDATE_BOARD_LOADING:
            return { ...state, loading: payload }
        case UPDATE_BOARD_SOLVED_STATUS:
            return { ...state, solved: payload}
        case SET_VALIDATING_STATUS:
            return { ...state, isValidating: payload }
        default:
            return state
    }
}

export default board