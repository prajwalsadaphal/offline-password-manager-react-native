
import React ,{useState,useEffect}from 'react';
import {useDispatch , connect} from "react-redux"
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { Input ,Item ,Text , Button ,H1} from 'native-base';
import {loginUser} from "../actions/auth"
import SnackBar from "react-native-snackbar"
import propTypes from "prop-types"
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { color } from 'react-native-reanimated';

const Login =({navigation , authState,loginUser})=>{
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [biometryType,setBiometryType] = useState(null)


  useEffect(()=>{
    FingerprintScanner.isSensorAvailable()
    .then((biometryType) => {
      console.log(biometryType)
      setBiometryType({biometryType});
    })
    .catch((error) => console.log('isSensorAvailable error => ', error));
  },[])

  const Validation= ()=>{
    if(username ==="" || password === ""){
      console.log(username,password)
      SnackBar.show({
        text:"Username or password cannot be empty",
        textColor:"white",
        backgroundColor:"red"
      })
      return false
    }
      return true
    }
  
  const loginScanner = ()=>{
    console.log("here")
      FingerprintScanner.authenticate({
        description:"Scan your finger to login"
      })
      .then(() => {
        console.log("matched ")
        navigation.reset({  
          index: 0,
          routes: [{ name: 'Home' }],
        });
        loginUser({username:authState.user.username, password:authState.user.password})
      
      })
      .catch((error) => {
        console.log('Authentication error is => ', error);
      });
  }
  
  const login = ()=>{
    if(Validation()){

      console.log(username,password)
      if(authState.user.username===username && authState.user.password===password){
        loginUser({username , password})
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }else{
        SnackBar.show({
          text:"Invalid username and password",
          textColor:"white",
          backgroundColor:"red"
      })
      }

    }
    
    

  }

  return(
    <SafeAreaView style={style.container}> 
      

              <Text style={style.label}>Username</Text>
              <Item style={style.inputContainer}>
              <Input 
                placeholder="Username" 
                value={username} 
                placeholderTextColor="grey"  
                style={style.input} 
                onChangeText={(text)=>setUsername(text)}
                />
              </Item>

              <Text style={style.label}>Password</Text>
              <Item style={style.inputContainer}>
               <Input 
                placeholder="Password"  
                value={password} 
                placeholderTextColor="grey" 
                style={style.input} 
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                />
              </Item>
              <Button block style={style.button}  onPress={login}>
                <Text>Login</Text>
              </Button>
              <Text style={{color:"#fff",textAlign:"center"}}>Or</Text>
              
              {biometryType && 
                <Button block style={style.button}  onPress={loginScanner}>
                  <Text>Scan your fingerprint</Text>
                </Button>}
              
    
            
  </SafeAreaView>)
}

const style = StyleSheet.create({
  container : {
     width :"100%",
     height:"100%",
     justifyContent:"center",
     backgroundColor:"#222831"

    
    },
  label:{
    marginLeft:20,
    color:"#000",
    color:"#fff"
  },

    inputContainer:{
      borderBottomWidth:0
    },
    input:{
      borderWidth:2,
      borderColor:"#fff",
      margin:20,
      borderRadius:50,
      color:"#fff"
      
    },
    button:{
      margin:20,
      backgroundColor:"#00adb5"
    }

})

Login.propTypes = {
  loginUser:propTypes.func.isRequired,
  authState:propTypes.object.isRequired
}

const mapStateToProps = (state)=>({
  authState:state.auth
})

const mapDispatchToProps = {
  loginUser:(data)=>loginUser(data)
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
