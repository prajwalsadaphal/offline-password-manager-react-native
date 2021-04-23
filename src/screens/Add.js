import React ,{useState}from "react"
import {Text , StyleSheet,View } from "react-native"
import  {
    Item,
    Form,
    Input,
    Button,
    Label
} from "native-base"

import {connect} from "react-redux"
import {createPassword, loadPasswords} from "../actions/manager"
import PasswordList from "../components/PasswordList"
import SnackBar from "react-native-snackbar"

const Add = ({navigation,managerState,createPassword,loadPasswords})=>{
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")

    const Validation= ()=>{
        if(name === "" || password==="" || username===""){
            SnackBar.show({
                text:"No field can be empty",
                backgroundColor:"red"
            })
            return false
        }

        return true
    }

    const addToList= ()=>{
        if(Validation()){
            createPassword({name ,username, password})
            setName("")
            setPassword("")
            setUsername("")
            navigation.navigate("Home")
        }
        
    }

    return(
            <View style={styles.container}>
                <Form >

                    <Item style={styles.formItem}>
                        
                        <Input
                            placeholder="Name of site or application"
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText = {(text)=> setName(text)}
                        />
                    </Item>
                    <Item style={styles.formItem}>
                        <Input
                            placeholder="Enter username of site"
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText = {(text)=> setUsername(text)}
                        />
                    </Item>
                    <Item style={styles.formItem}>
                        <Input
                            placeholder="Enter password of site"
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText = {(text)=> setPassword(text)}
                        />
                    </Item>

                    <Button onPress={addToList} style={styles.button}>
                        
                            <Text style={{color:"#fff",textTransform:"uppercase"}}>Add</Text>
                    
                    </Button>
                </Form>
        </View>

    )
}

const styles = StyleSheet.create({
  
    container: {
        flex:1,
        backgroundColor:"#222831"
       
    },
    formItem: {
        height:100,
        marginLeft:20,
        marginRight:20,
        borderBottomWidth:0
      
    },input:{
        color:"#eee",  
        borderBottomWidth:2,
        borderColor:"grey"
    },
    button:{
        width:"90%",
        textAlign:"center",
        marginRight:20,
        marginLeft:20,
        justifyContent:"center",
        backgroundColor:"#00adb5"
          
    }
  });


  const mapStateToProps = (state)=>({
    managerState:state.manager.passwords
})

const mapDispatchToProps={
    createPassword:(data)=>createPassword(data),
    loadPasswords:(data)=>loadPasswords(data)
}

export default  connect(mapStateToProps,mapDispatchToProps)(Add)
