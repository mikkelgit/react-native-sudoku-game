import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import convertToMinute from '../helpers/convertToMinute'

export default function Finish({ route, navigation }) {
    const leaderboard = useSelector(state => state.leaderboard.list)
    const { username, difficulty, solveTimeInSecond } = route.params
    return (
        <View style={styles.container}>
            <View style={styles.gameFinishWrapper} >
                <View style={styles.finishHeadersBackground} >
                    <Text style={styles.finishHeaders} >You Solved The Board 🥳 !</Text>
                </View>
                <View style={styles.gameFinishInfoWrapper} >
                    <Text style={styles.gameFinishInfo} >{username} just finished sugoku with {difficulty} difficulty within {
                    solveTimeInSecond < 60 ? (
                        convertToMinute(solveTimeInSecond).slice(2) < 10 ? convertToMinute(solveTimeInSecond).slice(3) : convertToMinute(solveTimeInSecond).slice(2)
                        ) : convertToMinute(solveTimeInSecond)
                    } {
                    solveTimeInSecond < 60 ? 'seconds' : 'minutes'
                    }</Text>
                </View>
                <View style={styles.leaderboardContainer} >
                    <View style={styles.leaderboardHeadersWrapper} >
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30, fontWeight: 'bold', color: '#fff3e7' }} >Top 5 Player</Text>
                        <View style={styles.leaderboardItemHeaders}>
                            <Text style={styles.leaderboardItemHeadersContent} >Username</Text>
                            <Text style={styles.leaderboardItemHeadersContent} >Difficulty</Text>
                            <Text style={styles.leaderboardItemHeadersContent} >Time</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.leaderboard} >
                        {
                            leaderboard.sort((a, b) => a.solveTimeInSecond - b.solveTimeInSecond).slice(0, 5).filter(item => {
                                if (item.difficulty === difficulty) {
                                    return item
                                }
                            }).map((item, i) => {
                                return (
                                    <View key={i} style={styles.leaderboardItem} >
                                        <Text style={styles.leaderboardItemContent} >{item.username}</Text>
                                        <Text style={styles.leaderboardItemContent} >{item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}</Text>
                                        <Text style={styles.leaderboardItemContent} >{convertToMinute(item.solveTimeInSecond)}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.playAgainButton}  onPress={() => navigation.replace('Home')} >
                    <Text style={styles.playAgainText} >Play Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff3e7",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: "relative",
    },
    gameFinishWrapper: {
        paddingHorizontal: 30,
        paddingTop: 50
    },
    finishHeaders: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    finishHeadersBackground: {
        backgroundColor: '#ff8b72',
        padding: 10,
        borderRadius: 10
    },
    gameFinishInfoWrapper: {
        marginTop: 20
    },
    gameFinishInfo : {
        color:'#ff8b72',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    playAgainButton: {
        backgroundColor: '#fff3e7',
        borderWidth: 3,
        borderColor: '#ff8b72',
        padding: 10,
        borderRadius: 10
    },
    playAgainText: {
        textAlign: 'center',
        color: '#ff8b72',
        fontSize: 20,
        fontWeight: 'bold'
    },
    leaderboardContainer: {
        marginVertical: 20,
    },
    leaderboard: {
        backgroundColor: '#e1701a',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxHeight: 300,
        overflow: 'hidden'
    },
    leaderboardItem: {
        flexDirection: 'row',
        backgroundColor: '#fff3e7',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    leaderboardItemHeaders: {
        flexDirection: 'row',
        padding: 10,
    },
    leaderboardHeadersWrapper: {
        backgroundColor: '#ff8b72',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    leaderboardItemHeadersContent: {
        color: 'white',
        textAlign: 'center',
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold'
    },
    leaderboardItemContent: {
        color: '#e1701a',
        textAlign: 'center',
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold'
    },
    leaderboardOrder: {
        backgroundColor: '#ff8b72',
        position: 'absolute',
        padding: 8,
        borderRadius: 50,
        left: -5,
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leaderboardOrderContent: {
        color: 'white',
        fontFamily: 'sans-serif',
    }
});
