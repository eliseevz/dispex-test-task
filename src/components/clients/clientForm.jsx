import React from 'react';
import Button from "../Button";

const ClientForm = ({handleSubmit, changeHandler, data, handleClose}) => {

    const isValid = data?.phone.length === 10

    return (
        <form onSubmit={handleSubmit} className="modalForm d-flex flex-column">
            <div className="d-flex flex-column">
                <label>Имя</label>
                <input
                    onChange={changeHandler}
                    value={data?.name}
                    name={"name"}
                    type="text"
                    aria-label="First name"
                    className="form-control"
                />
            </div>
            <div className="d-flex flex-column">
                <label>Телефон <span className="text-danger">*</span></label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">+7</span>
                    <input
                        onChange={changeHandler}
                           value={data?.phone}
                           name={"phone"} type="text"
                           className="form-control"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                    />
                </div>
            </div>
            <div className="d-flex flex-column">
                <label>Email</label>
                <input onChange={changeHandler} value={data?.email} name={"email"} type="text" aria-label="First name" className="form-control"/>
            </div>
            <div className="d-flex mt-4">
                <Button formType="button" onClick={handleClose} type="secondary">Отмена</Button>
                <Button disabled={!isValid} formType="submit" type="primary" classes="ms-3"> Сохранить</Button>
            </div>
        </form>
    );
};

export default ClientForm;
