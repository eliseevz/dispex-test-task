import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import streetsReducer from "./streets";
import housesReducer from "./houses";
import flatReducer from "./flat";
import clientsReducer from "./clients";


const rootReducer = combineReducers({
    streets: streetsReducer,
    houses: housesReducer,
    flat: flatReducer,
    clients: clientsReducer
})

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}