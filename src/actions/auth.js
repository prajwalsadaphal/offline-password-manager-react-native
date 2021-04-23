import SnackBar from "react-native-snackbar"
import AsyncStorage from "@react-native-community/async-storage"
import shortid from "shortid"
import {SET_USER,IS_AUTHENTICATED} from "./action.types"

export const setUser = (data)=>(dispatch)=>{
    console.log("from setuser",data)
    dispatch({
        type:SET_USER,
        payload:data
    })

}

export const signUp =  (data) => async(dispatch)=>{

    try {
        
        const createUser = {
            id:shortid.generate(),
            username:data.username,
            password:data.password
        }
        console.log(createUser)
        await AsyncStorage.setItem("@user", JSON.stringify(createUser))
        
        SnackBar.show({
            text:"Account created",
            textColor:"white",
            backgroundColor:"green"
        })

        return dispatch( {
            type:IS_AUTHENTICATED,
            payload:createUser
        })

    } catch (error) {
        console.error(error)
        SnackBar.show({
            text:"Signup faild",
            textColor:"white",
            backgroundColor:"red"

        })
    }
}



export const loginUser = (data)=> (dispatch)=>{
        dispatch({
            type:IS_AUTHENTICATED,
            payload:data
        })

        SnackBar.show({
            text:"Login success",
            textColor:"white",
            backgroundColor:"green"
        })
}
