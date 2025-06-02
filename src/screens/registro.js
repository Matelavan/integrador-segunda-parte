import {Text, View, TouchableOpacity, TextInput} from 'react-native'
import {Component} from 'react'
import {db, auth, storage} from "../firebase/config";

class Registro extends Component {
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
        this.props.navigation.navigate("login")
    }
    OnSubmit(nombre, mail, contraseña){
        auth.createUserWithEmailAndPassword(mail, contraseña)
        .then((user) => {
            if (user) {
                console.log("Registrado")
                db.collection("users").add({
                    nombre: nombre,
                    mail: mail,
                    contraseña: contraseña
                })
                .then(this.props.navigation.navigate("login"))
            }
        })
        .catch((e) => {
            this.setState({error: e.message})
            console.log(this.state.error)
        })
    }
    render(){
        return(
            <View>
                <TextInput style = "" placeholder = "Nombre de usuario" onChangeText = {(Text) => this.setState({nombre : Text})} value = {this.state.nombre}></TextInput>
                <TextInput style = "" placeholder = "Mail" onChangeText = {(Text) => this.setState({mail : Text})} value = {this.state.mail}></TextInput>
                <TextInput style = "" placeholder = "Contraseña" onChangeText = {(Text) => this.setState({contraseña : Text})} value = {this.state.contraseña}></TextInput>
                <TouchableOpacity onPress = {() => this.OnSubmit(this.state.nombre, this.state.mail, this.state.contraseña)}><Text>Registrarse</Text></TouchableOpacity>
                {this.state.error !== ""? <Text>{this.state.error}</Text>: <Text></Text>}   
                <Text>Ya tenes cuenta?</Text>   
                <TouchableOpacity onPress = {() => this.redireccionar()}><Text>Loguearse</Text></TouchableOpacity>        
            </View>
        )
    }
}
export default Registro