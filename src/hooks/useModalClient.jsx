import React, {useContext, useEffect, useState} from "react"
import Button from "../components/Button";
import {useDispatch} from "react-redux";
import {createClient, updateClientInfo} from "../store/clients";
import {nanoid} from "nanoid";
import ClientForm from "../components/clients/clientForm";

const ModalClient = React.createContext()

export const useModalClient = () => {
    return useContext(ModalClient)
}


const ModalClientProvider = ({children}) => {

    const dispatch = useDispatch()
    const [config, setConfig] = useState({
        client: null,
        type: "new"
    })

    const [active, setActive] = useState(false)

    const [data, setData] = useState(null)

    useEffect(() => {
        setData(config.type === "edit"
            ?  {name: config?.client?.name, email: config?.client?.email, phone: config?.client?.phone}
            : {name: "", email: "", phone: ""}
        )
    }, [config])


    const changeHandler = (e) => {
        const newState = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(newState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (config.type === "edit") {
            dispatch(updateClientInfo({...config.client, ...data}))
        }
        if (config.type === "new") {
            dispatch(createClient({...data, bindId: 64238}))
        }
        setActive(false)
    }

    const handleClose = () => {
        setActive(false)
    }

    return <ModalClient.Provider value={{setActive, setConfig}}>
        {
            <div  className={`modall ${active ? "active" : ""}`}>
                <ClientForm
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                    data={data}
                    changeHandler={changeHandler}
                />
            </div>
        }
        {children}
    </ModalClient.Provider>
}

export default ModalClientProvider