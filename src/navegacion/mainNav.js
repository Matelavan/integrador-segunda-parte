import {Component} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import registro from "../screens/registro"

const Stack = createNativeStackNavigator()
export default class MainNav extends Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name = "registro" component = {registro} options = {{headerShown: false}}/> 
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}