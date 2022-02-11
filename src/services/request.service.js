import httpService from "./http.service";
const requestApiEndPoint = "Request/"


const requestService = {
    getStreets: async () => {
        const {data} = await httpService.get(requestApiEndPoint+ "streets")
        return data
    },
    getHouses: async (id) => {
        const {data} = await httpService.get(requestApiEndPoint + `houses/${id}`)
        return data
    },
    getFlats: async (id) => {
        const {data} = await httpService.get(requestApiEndPoint + `house_flats/${id}`)
        return data
    }
}

export default requestService