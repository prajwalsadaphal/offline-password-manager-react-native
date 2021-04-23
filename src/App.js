
import React , {useEffect , useState} from 'react';
import "react-native-gesture-handler"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {useDispatch, connect} from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Home from "./screens/Home"
import {setUser} from "./actions/auth"
import Add from "./screens/Add"


const Stack = createStackNavigator()

const App =({authState,setUser})=>{
 
  const userCheck = async()=>{
    try {
      
      const data = await AsyncStorage.getItem("@user")
      const  user= await JSON.parse(data)
      if(user !==null){
        setUser(user)
        console.log("aaaaaaaaaaaaaaaappppppppp",user)
        
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    userCheck()
  },[])

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        {authState.user!=null? (

            <Stack.Screen

            name="Login" 
            component={Login}
            options={{
              headerStyle:{
                backgroundColor:"#00adb5"
              },
              title:"Login",
              headerTintColor:"#fff",
              headerLeft:null
            }}
            />
        ):(

          <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{
            headerStyle:{
              backgroundColor:"#00adb5"
            },
            title:"Signup",
            headerTintColor:"#fff",
            headerLeft:null
          }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle:{
              backgroundColor:"#00adb5"
            },
            title:"Password Manager",
            headerTintColor:"#fff",
            headerLeft:null
          }}
        />

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle:{
              backgroundColor:"#00adb5"
            },
            title:"Add Password",
            headerTintColor:"#fff",
        
          }}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
    
    )
}


const mapStateToProps = (state)=>({
  authState:state.auth
})

const mapDispatchToProps = {
  setUser : (data)=>setUser(data)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
