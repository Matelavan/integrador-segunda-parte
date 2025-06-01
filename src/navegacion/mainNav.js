import {Component} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Registro from "../screens/registro"
import TabNav from "./tabNav"
import Home from '../screens/home'
import Login from '../screens/login'

const Stack = createNativeStackNavigator()

export default class MainNav extends Component{
    render(){
        return(
            
                <Stack.Navigator>
                    <Stack.Screen name = "registro" component = {Registro} options = {{headerShown: false}}/>
                    <Stack.Screen name = "login" component = {Login} options = {{headerShown: false}}/> 
                    <Stack.Screen name = "TabNav" component = {TabNav} options = {{headerShown: false}}/> 
                   
                </Stack.Navigator>
            
        )
    }
}

//el tabnav tiene que aparecer cuando estas logueado 
// tiene que estar el login dentro del stack navigator