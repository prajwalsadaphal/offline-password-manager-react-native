import {combineReducers} from "redux"
import auth from "./auth"
import manager from "./manager"

export default combineReducers({
    auth,
    manager
})