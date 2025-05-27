import {Text, View, TouchableOpacity, TextInput} from 'react-native'
import {Component} from 'react'
import {db, auth, storage} from "../components/firebase/config";

class registro extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){

    }
    redireccionar(){
        this.props.navigate("login")
    }
    render(){
        return(
            <View><text>registro</text></View>
        )
    }
}
export default registro