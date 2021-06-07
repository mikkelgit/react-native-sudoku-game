import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Board from "../components/Board";
import { useDispatch } from 'react-redux'
import { updateBoardSolvedStatus } from '../store/action'

export default function Game({ route, navigation }) {
    const dispatch = useDispatch()
    const handleUserExitGame = () => {
        navigation.replace("Home");
    };

    const handleUserFinishGame = (params) => {
        dispatch(updateBoardSolvedStatus(false))
        navigation.replace("Finish", params);
    };

    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <Board {...route.params} handleUserExitGame={handleUserExitGame} handleUserFinishGame={handleUserFinishGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff3e7",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: "relative",
    },
    background: {
        backgroundColor: "#ff8b72",
        width: "100%",
        height: 275,
        position: "absolute",
    },
});
