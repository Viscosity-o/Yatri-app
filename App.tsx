import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Login";  // aapka login component
import Dash from "./Components/Dash";    // aapka dashboard component
import SOSActive  from "./Components/SOS";
import Support from "./Components/Support";
import SupportScreen from "./Components/Support";
import SafetyDetails from "./Components/Protection";
import ReportIssue from "./Components/report";
import MapFrontPage from "./Components/Map";

export type RootStackParamList = {
  Login: undefined;
  Dash: undefined;
  imp: undefined;
  Par:undefined;
   CARD:undefined;
   issue:undefined;
   mrp:undefined;
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


      <Stack.Screen
          name="Par"
          component={Support}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name = "CARD"
          component ={SafetyDetails}
          options={{ headerShown : false}}
          />
          <Stack.Screen
          name ="issue"
          component ={ReportIssue}
          options ={{ headerShown : false}}
          />



 <Stack.Screen
          name ="mrp"
          component ={MapFrontPage}
          options ={{ headerShown : false}}
          />







      </Stack.Navigator>
    </NavigationContainer>
  );
}