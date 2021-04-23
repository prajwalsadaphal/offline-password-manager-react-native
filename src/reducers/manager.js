import {CREATE_PASSWORD,LOAD_PASSWORD} from "../actions/action.types"

const initialState = {
    passwords:[]
}

export default (state=initialState , action)=>{

    switch (action.type) {
        case CREATE_PASSWORD:
            console.log("from manager reducer create password", action.payload)
            return {
                ...state,
                passwords:action.payload
                
            }
        case LOAD_PASSWORD:
            return{
                ...state,
                passwords:action.payload
            }
        default:
            return state
    }
}