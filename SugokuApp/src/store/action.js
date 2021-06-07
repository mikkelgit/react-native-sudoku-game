export const SET_BOARD = 'board/setBoard'
export const SET_INITIAL_BOARD = 'board/setInitialBoard'
export const UPDATE_BOARD_LOADING = 'board/updateBoardLoading'
export const UPDATE_BOARD_SOLVED_STATUS = 'board/updateBoardSolvedStatus'
export const ADD_LEADERBOARD_LIST = 'leaderboard/addLeaderBoardList'
export const SET_VALIDATING_STATUS = 'board/setValidatingBoardStatus'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
const encodeParams = (params) => 
Object.keys(params)
.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
.join('&')

export function fetchBoard(difficulty) {
    return function(dispatch) {
        dispatch(updateBoardLoading(true))
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setInitialBoard(data.board.map(function(arr) {
                    return arr.slice()
                })))
                dispatch(updateBoard(data.board.map(function(arr) {
                    return arr.slice()
                })))
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(dispatch(updateBoardLoading(false))))
    }
}

export function validateBoard(board) {
    return function(dispatch) {
        dispatch(setValidatingBoardStatus(true))
        return fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeParams(board)
        })
            .then(res => res.json())
            // .then(data => {
            //     if (data.status === 'solved') {
            //         dispatch(updateBoardSolvedStatus(true))
            //     }
            // })
            // .catch(err => console.log(err))
    }
}

export function solveBoard(board) {
    return function(dispatch) {
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeParams(board)
        })
            .then(res => res.json())
            .then(data => dispatch(updateBoard(data.solution)))
            .catch(err => console.log(err))
    }
}

export function setInitialBoard(payload) {
    return { type: SET_INITIAL_BOARD, payload }
}

export function updateBoard(payload) {
    return { type: SET_BOARD, payload }
}

export function updateBoardLoading(payload) {
    return { type: UPDATE_BOARD_LOADING, payload }
}

export function updateBoardSolvedStatus(payload) {
    return { type: UPDATE_BOARD_SOLVED_STATUS, payload }
}

export function addLeaderBoardList(payload) {
    return { type: ADD_LEADERBOARD_LIST, payload }
}

export function setValidatingBoardStatus (payload) {
    return { type: SET_VALIDATING_STATUS, payload }
}