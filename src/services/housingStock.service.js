import httpService from "./http.service";
const HousingStockApiEndPoint = "HousingStock"

const housingStockService = {
    getClients: async (id) => {
        const {data} = await httpService.get(HousingStockApiEndPoint + `/clients?addressId=${id}`)
        return data
    },
    updateClient: async (payload) => {
        const {data} = await httpService.post(HousingStockApiEndPoint + "/client", payload)
        return data
    },
    bindClient: async (payload) => {
        const {data} = await httpService.put(HousingStockApiEndPoint + "/bind_client", payload)
        return data
    },
    deleteClient: async (id) => {
        const {data} = await httpService.delete(HousingStockApiEndPoint + `/bind_client/${id}`)
        return data
    }
}

export default housingStockService