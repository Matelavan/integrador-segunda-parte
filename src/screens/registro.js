import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
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
            <View style={styles.container}>
                <TextInput style = {styles.input} placeholder = "Nombre de usuario" onChangeText = {(Text) => this.setState({nombre : Text})} value = {this.state.nombre}></TextInput>
                <TextInput style = {styles.input} placeholder = "Mail" onChangeText = {(Text) => this.setState({mail : Text})} value = {this.state.mail}></TextInput>
                <TextInput style = {styles.input} placeholder = "Contraseña" onChangeText = {(Text) => this.setState({contraseña : Text})} value = {this.state.contraseña}></TextInput>
                <TouchableOpacity style={styles.button} onPress = {() => this.OnSubmit(this.state.nombre, this.state.mail, this.state.contraseña)}><Text style={styles.buttonText}>Registrarse</Text></TouchableOpacity>
                {this.state.error !== ""? <Text style={styles.error}>{this.state.error}</Text>: <Text></Text>}   
                <Text style={styles.text}>Ya tenes cuenta?</Text>   
                <TouchableOpacity onPress = {() => this.redireccionar()}><Text style={styles.link}>Loguearse</Text></TouchableOpacity>        
            </View>
        )
    }
}
export default Registro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#F0FCFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3897f0',
    paddingVertical: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 20,
  },
  link: {
    color: '#3897f0',
    fontWeight: '600',
    marginTop: 5,
  },
})