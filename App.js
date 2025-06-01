
import { Text, View, TouchableOpacity } from 'react-native';
import MainNav from "./src/navegacion/mainNav"
import {NavigationContainer} from "@react-navigation/native"

export default function App() {
  return (
    <NavigationContainer>
    <MainNav/>
    </NavigationContainer>
  );
}

