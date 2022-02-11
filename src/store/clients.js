import {createSlice} from "@reduxjs/toolkit";
import housingStockService from "../services/housingStock.service";
import httpService from "../services/http.service";


const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        entities: [],
        isLoading: false,
        dataLoaded: false,
        currentFlatId: null,
        address: null,
        error: null
    },
    reducers: {
        clientsRequest: state => {
            state.isLoading = true
        },
        clientsRequestSuccess: (state, action) => {
            state.entities = action.payload.data
            state.currentFlatId = action.payload.flatId
            state.address = action.payload.address
            state.dataLoaded = true
            state.isLoading = false
        },
        clientsRequestFailed: (state, action) => {
            state.error = action.payload
            state.dataLoaded = false
            state.isLoading = false
        },
        updateClient: (state, action) => {
            state.entities = action.payload
        }
    }
})

const {reducer: clientsReducer, actions} = clientsSlice

const {
    clientsRequest,
    clientsRequestSuccess,
    clientsRequestFailed,
    updateClient
} = actions

export const loadClientsList = (payload) => async (dispatch) => {
    dispatch(clientsRequest())
    try {
        const data = await housingStockService.getClients(payload.id)
        dispatch(clientsRequestSuccess({data, flatId: payload.id, address: payload.address}))
    } catch (e) {
        dispatch(clientsRequestFailed(e))
    }
}

export const getClientsList = () => (state) => {
    return state.clients.entities
}

export const getAddress = () => (state) => {
    return state.clients.address
}

export const updateClientInfo = (payload) => async (dispatch, getState) => {
    const state = getState().clients.entities
    try {
        const data = await housingStockService.updateClient(payload)
        const newState = state.map(client => {
            if (client.id === payload.id) {
                return payload
            } else {
                return client
            }
        })
        dispatch(updateClient(newState))
    } catch (e) {

    }
}

export const createClient = (payload) => async (dispatch, getState) => {
    try {
        const resp = await housingStockService.updateClient(payload)
        const state = getState().clients
        await housingStockService.bindClient({
            AddressId: state.currentFlatId,
            ClientId: resp.id
        })
        const newState = [...state.entities, {...payload, id: resp.id}]
        dispatch(updateClient(newState))
    } catch (e) {
    }
}

export const deleteClient = (id) => async (dispatch, getState) => {
    const state = getState().clients.entities
    try {
        await housingStockService.deleteClient(id)
        dispatch(updateClient(state.filter(client => client.bindId !== id)))
    } catch (e) {
    }
}

export const getDataStatus = () => state => {
    return state.clients.dataLoaded
}

export default clientsReducer