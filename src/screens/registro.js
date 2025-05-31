import {Text, View, TouchableOpacity, TextInput} from 'react-native'
import {Component} from 'react'
import {db, auth, storage} from "../firebase/config";
import TabNav from "../navegacion/tabNav"

class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            contraseña: "",
            nombre: ""
        }
    }
    componentDidMount(){
        console.log(this.props)
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.navigation.navigate
            }
        })
    }
    redireccionar(){
        this.props.navigate("login")
    }
    render(){
        return(
            <View><TabNav/><Text>registro</Text></View>
        )
    }
}
export default Registro