import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker'

export default function Home({ navigation }) {
    const [userName, setUsername] = useState('')
    const [gameDifficulty, setGameDifficulty] = useState('')
    const [formError, setFormError] = useState(false)

    const handlePlayGame = () => {
        if (!userName || !gameDifficulty) {
            setFormError(true)
        } else {
            setFormError(false)
            navigation.replace('Game', {
                username: userName,
                difficulty: gameDifficulty
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                <View style={styles.headersContentWrapper}>
                    <Text style={styles.headersContent}>SUGOKU</Text>
                </View>
            </View>
            <View style={styles.formContainer}>
                {
                    formError?(
                        <View style={{ backgroundColor: '#ee4d4d', padding: 10, marginBottom: 20, borderRadius: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }} >All field are required</Text>
                        </View>
                    ):null
                }
                <View style={styles.usernameInput}>
                    <TextInput maxLength={12} onChangeText={(text) => setUsername(text)} placeholder="Username (max. 12 chars)" value={userName} ></TextInput>
                </View>
                <View>
                    <View style={{ backgroundColor: 'white', marginTop: 25 }}>
                        <Picker style={styles.pickerStyle} onValueChange={(itemValue) => setGameDifficulty(itemValue)} selectedValue={gameDifficulty} >
                            <Picker.Item label="Select Difficulty" value="" />
                            <Picker.Item label="Easy" value="easy" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="Hard" value="hard" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => handlePlayGame()} style={styles.playButton} >
                        <Text style={styles.playButtonContent} >Play</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    headers: {
        paddingTop: 100,
    },
    headersContent: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    headersContentWrapper: {
        backgroundColor: '#ff8b72',
        padding: 15,
        borderTopStartRadius: 30,
        borderBottomEndRadius: 30,
        borderTopEndRadius: 5,
        borderBottomStartRadius: 5
    },
    usernameInput: {
        padding: 20,
        backgroundColor: 'white',
        minWidth: '100%',
        borderRadius: 15
    },
    formContainer: {
        paddingVertical: 30,
        paddingHorizontal: 50
    },
    playButton: {
        backgroundColor: '#ff8b72',
        padding: 15,
        borderRadius: 10,
        marginVertical: 30
    },
    playButtonContent: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    pickerStyle: {
        width: 300,
        height: 45
    }
});
