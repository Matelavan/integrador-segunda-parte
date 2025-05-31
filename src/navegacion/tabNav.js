import {Component} from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Octicons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"
import MiPerfil from "../screens/miPerfil"
import crearPost from '../screens/crearPost'



const Tab = createBottomTabNavigator()

export default class TabNav extends Component{
    render(){
        return(
            <Tab.Navigator>
                    <Tab.Screen name = "Mi perfil" component={MiPerfil} options = {{headerShown: false, tabBarIcon: () => <Octicons name= "feed-rocket" size= {24} color= "black"/>}}/>
                    <Tab.Screen name='Crear Post' component={crearPost} /> 
                 
                    

            </Tab.Navigator>
        )
    }
}