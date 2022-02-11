import React from 'react';
import {useSelector} from "react-redux";
import {getAddress, getClientsList, getDataStatus} from "../store/clients";
import ClientCard from "./clients/clientCard";
import Button from "./Button";
import {useModalClient} from "../hooks/useModalClient";

const FlatPanel = () => {

    const clients = useSelector(getClientsList())
    const fullAddress = useSelector(getAddress())

    const dataStatus = useSelector(getDataStatus())

    const {setActive, setConfig} = useModalClient()

    const openModal = () => {
        setActive(true)
        setConfig({
            type: "new"
        })
    }


    return (
        <div className="mt-5">
            {
                dataStatus
                    ? <>
                        <h5 className="mb-4">{fullAddress}</h5>
                        <Button onClick={openModal}>
                            <i className="bi bi-person-plus-fill"></i> Добавить
                        </Button>
                        <div className="row mt-4">
                            {
                                clients.length > 0 && clients.map(client => <ClientCard key={client.id} data={client}/>)
                            }
                        </div>
                    </>
                    : <div>Список пуст</div>
            }
        </div>
    );
};

export default FlatPanel;
