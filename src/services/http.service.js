import axios from "axios"

const http = axios.create({
    baseURL: "https://dispex.org/api/vtest/"
})

const httpService = {
    get: http.get,
    post: http.post,
    delete: http.delete,
    put: http.put
}

export default httpService