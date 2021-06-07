import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Home from "./src/screens/Home";
import Game from "./src/screens/Game";
import Finish from "./src/screens/Finish";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
                    <Stack.Screen name="Finish" component={Finish} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}