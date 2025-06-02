import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
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
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder = "Mail" onChangeText = {(Text) => this.setState({mail : Text})} value = {this.state.mail}></TextInput>
                <TextInput style={styles.input} placeholder = "Contraseña" onChangeText = {(Text) => this.setState({contraseña : Text})} value = {this.state.contraseña}></TextInput>
                <TouchableOpacity style={styles.button} onPress = {() => this.OnSubmit( this.state.mail, this.state.contraseña)}><Text style={styles.buttonText}>Loguearse</Text></TouchableOpacity>
                {this.state.error !== ""? <Text style={styles.error}>{this.state.error}</Text>: <Text></Text>}   
                <Text style={styles.text}>No tenes cuenta?</Text>   
                <TouchableOpacity onPress = {() => this.redireccionar()}><Text style={styles.link}>Registrarse</Text></TouchableOpacity>        
            </View>
        )
    }
}
export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#F0FCFD',
    justifyContent: 'center',
    alignItems: 'center',
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
});