import React , {useState,useEffect} from "react"

import {Text , StyleSheet , ScrollView,SafeAreaView} from "react-native"
import  {

    View,
    Fab,
    Icon
} from "native-base"

import {connect , useDispatch} from "react-redux"
import {createPassword, loadPasswords} from "../actions/manager"
import PasswordList from "../components/PasswordList"
import Snackbar from "react-native-snackbar"
import {LOG_OUT} from "../actions/action.types"

const Home = ({navigation,managerState,createPassword,loadPasswords})=>{
    console.log("from home",managerState)  
    const dispatch = useDispatch()
    useEffect(()=>{
        loadPasswords()
    },[])

    const logOut = ()=>{
        
        dispatch({
            type:LOG_OUT
        })

        Snackbar.show({
            text:"Logged out",
            textColor:"white",
            backgroundColor:"red"
        })

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
    }
    
    return(
    
            <SafeAreaView style={styles.externalContainer}>        
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={styles.listView}>
                    
                    
                   { managerState && managerState.length>0?(<View>

                        <Text style={styles.textNo}>Your Passwords</Text>
                            
                            {
                                managerState.map(pass=>(
                                <PasswordList {...pass} key={pass.id}/>
                            ))}
                    
                    </View>):
                   
                    (<View>
                        <Text style={styles.textNo}>No password saved</Text>
                    </View>)
                   
                   } 
                </View>
                
            <Fab
                style={{backgroundColor:"red",marginBottom:100}}
                position="bottomRight"
                onPress={()=> logOut()}
            >
                <Icon name="log-out"/>
            </Fab>

            <Fab
                style={{backgroundColor:"#00adb5",marginBottom:20}}
                position="bottomRight"
                onPress={()=> navigation.navigate("Add")}
            >
                <Icon name="add"/>
            </Fab>
            </ScrollView>
            </SafeAreaView>

    
    )
}
const styles = StyleSheet.create({
    externalContainer:{
        flex:1,
        backgroundColor:"#222831"
    },
    container: {
        flex:1,
        marginTop:30
    },
    listView:{
        marginTop:20,
        
    },
    formItem: {
        borderBottomColor:"#fff",  
        height:100,
        marginLeft:20,
        marginRight:20
    },
    button:{
        width:100,
        textAlign:"center",
        
    },
    text:{
        color:"#fff",
        marginLeft:10,
        marginBottom:20,
        marginRight:10,
        height:50,
        width:150,
        textAlign:"center",
        paddingTop:10,
       
    },
    headingContainer:{
        flex:1,
        flexDirection:"row"
    },
    textNo:{
        color:"#eeeeee",
        fontSize:25,
        textAlign:"center"
    }
  });


const mapStateToProps = (state)=>({
    managerState:state.manager.passwords
})

const mapDispatchToProps={
    createPassword:(data)=>createPassword(data),
    loadPasswords:(data)=>loadPasswords(data)
}

export default  connect(mapStateToProps,mapDispatchToProps)(Home)