import SnackBar from "react-native-snackbar"
import AsyncStorage from "@react-native-community/async-storage"
import shortid from "shortid"
import {CREATE_PASSWORD,LOAD_PASSWORD} from "./action.types"


export const loadPasswords = (data)=> async(dispatch)=>{
    try {
        const storedValue = await AsyncStorage.getItem("@passwords")
        const passwordsList = await JSON.parse(storedValue)
        if(!passwordsList){
            
            dispatch({
                type:LOAD_PASSWORD,
                payload:[]
            })

        }else{
            dispatch({
                type:LOAD_PASSWORD,
                payload:passwordsList
            })
        }
    

    } catch (error) {
        console.log(error)
        SnackBar.show({
            text:"unable to load passwords",
            textColor:"white",
            backgroundColor:"red"
        })
    }
   


}


export const createPassword = (data)=>async(dispatch)=>{
    try {
        
        const passwordToCreate= {
            id:shortid.generate(),
            name:data.name,
            username:data.username,
            password:data.password
        }

        const storedValue = await AsyncStorage.getItem("@passwords")
        const prevList = await JSON.parse(storedValue)
        if(!prevList){
            const newList = [passwordToCreate]
            await AsyncStorage.setItem("@passwords",JSON.stringify(newList))
            dispatch({
                type:CREATE_PASSWORD,
                payload:newList
            })

        }else{
            prevList.push(passwordToCreate)
            await AsyncStorage.setItem("@passwords",JSON.stringify(prevList))
       
            dispatch({
                type:CREATE_PASSWORD,
                payload:prevList
            })
        }

        
        
        SnackBar.show({
            text:"Password added",
            backgroundColor:"green",
            textColor:"#fff"
        })
        
    } catch (error) {
        console.log(error)
        SnackBar.show({
            text:"Unable to create password",
            backgroundColor:"red",
            textColor:"#fff"
        })
    }
}


export const deletePassword = (id)=>async(dispatch)=>{
        const storedValue = await AsyncStorage.getItem("@passwords")
        const passwordsList = await JSON.parse(storedValue)
        if(!passwordsList){
            
            dispatch({
                type:LOAD_PASSWORD,
                payload:[]
            })

        }else{

            const filteredList = passwordsList.filter(item => id!=item.id)
            console.log("FItered kdfkskln lf",filteredList)
            await AsyncStorage.setItem("@passwords",JSON.stringify(filteredList))

            dispatch({
                type:LOAD_PASSWORD,
                payload:filteredList
            })
        }
}