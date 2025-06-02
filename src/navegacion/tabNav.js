import {Component} from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Octicons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"
import MiPerfil from "../screens/miPerfil"
import Home from '../screens/home'
import CrearPost from '../screens/crearPost'

const Tab = createBottomTabNavigator()

export default class TabNav extends Component{
    render(){
        return(
            <Tab.Navigator>       
                <Tab.Screen name = "home" component = {Home} options = {{headerShown: false, tabBarIcon: () => <AntDesign name= "home" size= {24} color= "black"/>}}/>
                <Tab.Screen name = "crearPost" component = {CrearPost} options = {{headerShown: false, tabBarIcon: () => <Octicons name= "pencil" size= {24} color= "black"/>}}/>
                <Tab.Screen name = "Mi perfil" component = {MiPerfil} options = {{headerShown: false, tabBarIcon: () => <Octicons name= "person" size= {24} color= "black"/>}}/>
                
            </Tab.Navigator>
        )
    }
}

