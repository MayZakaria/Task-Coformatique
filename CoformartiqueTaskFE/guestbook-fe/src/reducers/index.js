import { combineReducers } from "redux"
import messages from "./messages"
import users from "./users"


//here i determine the state of the whole app
export const rootReducer=combineReducers(
    {
    msgs:messages,
    users:users
})