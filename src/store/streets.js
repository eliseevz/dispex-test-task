import {createSlice} from "@reduxjs/toolkit";
import requestService from "../services/request.service";


const streetsSlice = createSlice({
    name: "streets",
    initialState: {
        entities: [],
        isLoading: false,
        dataLoaded: false,
        error: null
    },
    reducers: {
        streetsRequest: state => {
            state.isLoading = true
        },
        streetsRequestSuccess: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        streetsRequestFailed: (state, action) => {
            state.error = action.payload
            state.dataLoaded = false
            state.isLoading = false
        },
    }
})

const {reducer: streetsReducer, actions} = streetsSlice

const {
    streetsRequest,
    streetsRequestSuccess,
    streetsRequestFailed
} = actions

export const loadStreetsList = () => async (dispatch) => {
    dispatch(streetsRequest())
    try {
        const data = await requestService.getStreets()
        dispatch(streetsRequestSuccess(data))
    } catch (e) {
        dispatch(streetsRequestFailed(e))
    }
}

export const getSearchStreetList = (name) => (dispatch, getState) => {
    const state = getState().streets.entities
    return state.filter(street => street.name.toLowerCase().includes(name.toLowerCase()))
}

export const getStreetsList = () => (state) => {
    return state.streets.entities
}

export const getStreetByName = (name) => (dispath, getState) => {
    const state = getState().streets.entities
    return state.find(street => street.name === name)
}

export default streetsReducer