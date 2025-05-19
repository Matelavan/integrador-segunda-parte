import React, {Component} from "react";
import{View, Text, TouchableOpacity} from 'react-native'
class ComponenteIntegrador extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <TouchableOpacity>
                    <text>Arrancamos con el proyecto integrador</text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default ComponenteIntegrador