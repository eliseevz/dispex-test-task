import {createSlice} from "@reduxjs/toolkit";
import requestService from "../services/request.service";


const housesSlice = createSlice({
    name: "houses",
    initialState: {
        entities: [],
        isLoading: false,
        dataLoaded: false,
        error: null
    },
    reducers: {
        housesRequest: state => {
            state.isLoading = true
        },
        housesRequestSuccess: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        housesRequestFailed: (state, action) => {
            state.error = action.payload
            state.dataLoaded = false
            state.isLoading = false
        },
    }
})

const {reducer: housesReducer, actions} = housesSlice

const {
    housesRequest,
    housesRequestSuccess,
    housesRequestFailed
} = actions

export const loadHousesList = (id) => async (dispatch) => {
    dispatch(housesRequest())
    try {
        const data = await requestService.getHouses(id)
        dispatch(housesRequestSuccess(data))
        return data
    } catch (e) {
        dispatch(housesRequestFailed(e))
    }
}

export const getSearchHouseList = (name) => (dispatch, getState) => {
    const state = getState().houses.entities
    return state.filter(street => street.name.toLowerCase().includes(name.toLowerCase()))
}
//
// export const getStreetsList = () => (state) => {
//     return state.houses.entities
// }
//
export const getHouseByName = (name) => (dispath, getState) => {
    const state = getState().houses.entities
    return state.find(street => street.name === name)
}

export default housesReducer