

import React, {useEffect,useState} from 'react';
import {useDispatch , connect} from "react-redux"

import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
    Text,
    Button
} from "native-base"


import SnackBar from "react-native-snackbar"
import { Input ,Item} from 'native-base';
import propTypes from "prop-types"
import {signUp} from "../actions/auth"




const Signup =({navigation , signUp,authState})=>{
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [passwordConfirm , setPasswordConfirm] = useState("")


    const Validation= ()=>{
      if(username ==="" || password === ""){
        console.log(username,password)
        SnackBar.show({
          text:"Username or password cannot be empty",
          textColor:"white",
          backgroundColor:"red"
        })
        return false
      }else if(password != passwordConfirm){
        SnackBar.show({
          text:"Password did not matched",
          textColor:"white",
          backgroundColor:"red"
        })
        return false
      }

      return true
    }

    const doSignup= async()=>{
         if( Validation()){
            signUp({username,password})
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
         }
       

  
    }

  return(
    <SafeAreaView style={style.container}> 
      
              <Text style={style.label}>Username</Text>
              <Item style={style.inputContainer}>
                <Input 
                placeholder="Enter username" 
                value={username} 
                placeholderTextColor="grey"  
                style={style.input} 
                onChangeText={(text)=>setUsername(text)}
                />
              </Item>
              <Text style={style.label}>Password</Text>
              <Item style={style.inputContainer}>
                <Input 
                placeholder="Enter password"  
                value={password} 
                placeholderTextColor="grey" 
                style={style.input} 
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                />
              </Item>
              <Text style={style.label}>Confirm password</Text>
              <Item style={style.inputContainer}>
                <Input 
                placeholder="Re-type your password"  
                value={passwordConfirm} 
                placeholderTextColor="grey" 
                style={style.input} 
                onChangeText={(text)=>setPasswordConfirm(text)}
                secureTextEntry={true}
                />
              </Item>
              <Button style={style.button}  block onPress={doSignup}>
              <Text>SignUp</Text>
            </Button>
     
            
  </SafeAreaView>)
}

const style = StyleSheet.create({
  container : {
     width :"100%",
     height:"100%",
     justifyContent:"center",
     backgroundColor:"#222831"

    
    }, label:{
      marginLeft:20,
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

const mapStateToProps =(state)=>({
  authState:state.auth
})

const mapDispatchToProps ={
    signUp:(data)=>signUp(data)
}

Signup.propTypes={
    signUp:propTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
