import React from 'react';
import Button from "../Button";
import {useModalClient} from "../../hooks/useModalClient";
import {useDispatch} from "react-redux";
import {deleteClient} from "../../store/clients";

const ClientCard = ({data}) => {

    const {setActive, setConfig} = useModalClient()
    const dispatch = useDispatch()

    const openModal = () => {
        setActive(true)
        setConfig({
            client: data,
            type: "edit"
        })
    }

    const removeClient = () => {
        dispatch(deleteClient(data.bindId))
    }

    return (
        <div className="col-sm-4 mb-4">
            <div className="card p-3">
                    <div className="card-body d-flex justify-content-center flex-column">
                        <h5 className="card-title d-flex  justify-content-center align-items-center mb-4">
                            <i className="bi bi-person-fill me-2 fs-4"></i>
                            {data.name}
                        </h5>
                        {
                            data.phone &&
                            <div className="d-flex align-items-center  text-success justify-content-center">
                                <i className="bi bi-telephone-fill me-2"></i>
                                +7{data.phone}
                            </div>
                        }
                        {
                            data.email &&
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-envelope-fill me-2"></i>
                                {data.email}
                            </div>
                        }
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        <Button onClick={openModal} type="secondary" classes={"me-4"}>Редактировать</Button>
                        <Button onClick={removeClient} type="danger">Удалить</Button>
                    </div>
            </div>
        </div>
    );
};

export default ClientCard;
