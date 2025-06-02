import {Text, View, TouchableOpacity, TextInput} from 'react-native'
import {Component} from 'react'
import {db, auth, storage} from "../firebase/config";

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            nombre: "",
            mail: "",
            contraseña: "",
            error: ""
        }
    }
    componentDidMount(){
    auth.onAuthStateChanged( user => {
            if(user != null){
                this.props.navigation.navigate('TabNav')
            }
        })
    }
    redireccionar(){
        this.props.navigation.navigate("registro")
    }
    OnSubmit (email,password) { 

        auth.signInWithEmailAndPassword(email,password)
        .then((user) => 
        {if(user) {
            this.props.navigation.navigate('TabNav')
        }}
    )
    .catch((e) => {
        console.log(e)
        if (e.code === "auth/internal-error") {
            this.setState({error: 'el usuario o pass no son correctos'})
            console.log(this.state.error)
            alert('el usuario o pass no son correctos')
        }  else {
            this.setState({error: e.message})
            console.log(this.state.error)       
            }
        })
    }
    render(){
        console.log("estoy en el login")
        return(
            <View>
                <TextInput style = "" placeholder = "Mail" onChangeText = {(Text) => this.setState({mail : Text})} value = {this.state.mail}></TextInput>
                <TextInput style = "" placeholder = "Contraseña" onChangeText = {(Text) => this.setState({contraseña : Text})} value = {this.state.contraseña}></TextInput>
                <TouchableOpacity onPress = {() => this.OnSubmit( this.state.mail, this.state.contraseña)}><Text>Loguearse</Text></TouchableOpacity>
                {this.state.error !== ""? <Text>{this.state.error}</Text>: <Text></Text>}   
                <Text>No tenes cuenta?</Text>   
                <TouchableOpacity onPress = {() => this.redireccionar()}><Text>Registrarse</Text></TouchableOpacity>        
            </View>
        )
    }
}
export default Login