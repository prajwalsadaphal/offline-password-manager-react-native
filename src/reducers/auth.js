import {IS_AUTHENTICATED , SET_USER,LOG_OUT} from "../actions/action.types"

const initialState = {
    user:null,
    isAuthenticated: false
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case IS_AUTHENTICATED :
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        case SET_USER :
            console.log("form reducerrrr",action.payload)
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
        case LOG_OUT:
            return{
                ...state,
                isAuthenticated:false
            }
        default:
            return state
    }
}