import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Login";  // aapka login component
import Dash from "./Components/Dash";    // aapka dashboard component
import SOSActive  from "./Components/SOS";

export type RootStackParamList = {
  Login: undefined;
  Dash: undefined;
  imp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Dash" 
          component={Dash} 
          
          options={{ headerShown: false }} 
          
        />

          <Stack.Screen
          name="imp"
          component={SOSActive}
          options={{ title: "Emergency Active" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}