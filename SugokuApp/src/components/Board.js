import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchBoard,
    updateBoard,
    validateBoard,
    solveBoard,
    addLeaderBoardList,
    updateBoardSolvedStatus,
    setValidatingBoardStatus
} from '../store/action'

export default function Board({ username, difficulty, handleUserExitGame, handleUserFinishGame }) {
    const dispatch = useDispatch()
    const boardValue = useSelector(state => state.board.board)
    const initialBoard = useSelector(state => state.board.initialBoard)
    const loading = useSelector(state => state.board.loading)
    const solved = useSelector(state => state.board.solved)
    const isValidating = useSelector(state => state.board.isValidating)
    const [countDown, setCountDown] = useState(900)
    const [gameBegin, setGameBegin] = useState(false)
    const [validateWrong, setValidateWrong] = useState(false)

    useEffect(() => {
        dispatch(fetchBoard(difficulty))
    }, [])

    useEffect(() => {
        let countDownWatcher
        if (gameBegin) {
            countDownWatcher = setTimeout(() => {
                setCountDown(countDown - 1)
            }, 1000)
        }

		return () => {
            clearTimeout(countDownWatcher)
        }
    }, [countDown, gameBegin])

    useEffect(() => {
        if (solved) {
            const solveTimeInSecond = 3600 - countDown
            dispatch(addLeaderBoardList({ username, difficulty, solveTimeInSecond }))
            handleUserFinishGame({ username, difficulty, solveTimeInSecond })
        }
    }, [solved])

    useEffect(() => {
        let validateWatcher
        if (validateWrong) {
            validateWatcher = setTimeout(() => {
                setValidateWrong(false)
            }, 3000);
        }

        return () => {
            clearTimeout(validateWatcher)
        }
    }, [validateWrong])

    const handleCellChange = (rowIndex, colIndex, value) => {
        if (!gameBegin) {
            setGameBegin(true)
        }
        if (Number.isInteger(Number(value))) {
            let newBoard = boardValue.map(function(arr) {
                return arr.slice()
            })
            newBoard[rowIndex][colIndex] = Number(value)
            dispatch(updateBoard(newBoard))
        }
    }

    const handleSubmit = () => {
        dispatch(validateBoard({ board: boardValue }))
            .then(data => {
                if (data.status === 'solved') {
                    dispatch(updateBoardSolvedStatus(true))
                } else {
                    setValidateWrong(true)
                }
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(setValidatingBoardStatus(false)))
    }

    const handleAskForSolution = () => {
        if (!gameBegin) {
            setGameBegin(true)
        }
        dispatch(solveBoard({ board: initialBoard}))
    }

    if (loading) {
        return (
            <View>
                <Text style={styles.loadingNotification} >Loading Board . . .</Text>
            </View>
        )
    }

    const convertToMinutes = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return `${minutes}:${seconds}`
    }

    if (countDown <= 0) {
        return (
            <View style={{ paddingTop: 100 }} >
                <Text style={styles.timesUpNotif} >Times Up</Text>
                <View>
                    <TouchableOpacity onPress={() => handleUserExitGame()} style={styles.timesUpButtons}>
                        <Text style={{...styles.secondaryButtonContent, color: 'white'}}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.boardHeader}>
                {
                    validateWrong?(
                        <Text style={{...styles.headersContent, fontWeight: 'bold', color: '#ff8b72', backgroundColor: 'white'}} >Unsolved</Text>
                    ):(
                        <Text style={{...styles.headersContent, fontWeight: 'bold'}} >Time</Text>
                    )
                }
                <Text style={styles.headersContent} >{convertToMinutes(countDown)}</Text>
            </View>
            <View style={{ paddingHorizontal: 25 }} >
                <View style={styles.board} >
                    {
                        boardValue.map((boardRow, rowIndex) => {
                            return (
                                <View key={rowIndex} style={styles.rows} >
                                    {
                                        boardRow.map((boardCells, colIndex) => {
                                            return (
                                                <View key={colIndex} style={styles.cells} >
                                                    {
                                                        initialBoard[rowIndex][colIndex]?(
                                                            <Text style={styles.numberValue}>{boardCells}</Text>
                                                        ):(
                                                            <TextInput onChangeText={(text) => handleCellChange(rowIndex, colIndex, text)} style={{...styles.numberValue, color: 'gray'}}
                                                            keyboardType='number-pad' maxLength={1} value={boardCells ? boardCells.toString() : ''}
                                                            />
                                                        )
                                                    }
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{ marginTop: 30 }} >
                {
                    isValidating? (
                        <View style={{...styles.buttons, opacity: 0.75}}>
                            <Text style={styles.buttonsContent}>Validatng . . .</Text>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttons}>
                            <Text style={styles.buttonsContent}>Validate</Text>
                        </TouchableOpacity>
                    )
                }
                <View style={{ flexDirection: 'row' }} >
                    <TouchableOpacity onPress={() => handleAskForSolution()} style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonContent}>Solution</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleUserExitGame()} style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonContent}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        borderRadius: 23,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    cells: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(255, 232, 214, 1)',
        height: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberValue: {
        color: '#fda15f',
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center'
    },
    boardHeader: {
        marginBottom: 20,
    },
    headersContent: {
        color: 'white',
        fontSize: 35,
        color: 'white',
        textAlign: 'center'
    },
    buttons: {
        marginTop: 10,
        marginHorizontal: 25,
        backgroundColor: '#ff8b72',
        padding: 12,
        margin: 'auto',
        borderRadius: 7
    },
    secondaryButton: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 25,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 7
    },
    buttonsContent: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    secondaryButtonContent: {
        textAlign: 'center',
        color: '#ff8b72',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loadingNotification: {
        fontSize: 30,
        paddingTop: 50,
        color: 'white',
        fontWeight: 'bold'
    },
    timesUpNotif: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold'
    },
    timesUpButtons: {
        marginTop: 100,
        backgroundColor: '#ff8b72',
        padding: 12,
        margin: 'auto',
        borderRadius: 7
    }
});