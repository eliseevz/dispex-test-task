import {createSlice} from "@reduxjs/toolkit";
import requestService from "../services/request.service";


const flatSlice = createSlice({
    name: "flat",
    initialState: {
        entities: [],
        isLoading: false,
        dataLoaded: false,
        error: null
    },
    reducers: {
        flatRequest: state => {
            state.isLoading = true
        },
        flatRequestSuccess: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        flatRequestFailed: (state, action) => {
            state.error = action.payload
            state.dataLoaded = false
            state.isLoading = false
        },
    }
})

const {reducer: flatReducer, actions} = flatSlice

const {
    flatRequest,
    flatRequestSuccess,
    flatRequestFailed
} = actions

export const loadFlatsList = (id) => async (dispatch) => {
    dispatch(flatRequest())
    try {
        const data = await requestService.getFlats(id)
        dispatch(flatRequestSuccess(data))
        return data
    } catch (e) {
        dispatch(flatRequestFailed(e))
    }
}

export const getSearchFlatList = (name) => (dispatch, getState) => {
    const state = getState().flat.entities
    return state.filter(street => street.name.toLowerCase().includes(name.toLowerCase()))
}
//
// export const getStreetsList = () => (state) => {
//     return state.flat.entities
// }
//
export const getFlatByName = (name) => (dispath, getState) => {
    const state = getState().flat.entities
    return state.find(flat => flat.name === name)
}

export default flatReducer