import React, {useEffect, useState} from 'react';
import InputWithAutocomplete from "./inputWithAutocomplete";
import {useDispatch, useSelector} from "react-redux";
import {getSearchStreetList, getStreetByName, getStreetsList} from "../store/streets";
import {getHouseByName, getSearchHouseList, loadHousesList} from "../store/houses";
import {getFlatByName, getSearchFlatList, loadFlatsList} from "../store/flat";
import Button from "./Button";
import {loadClientsList} from "../store/clients";

const AddressForm = () => {

    const streets = useSelector(getStreetsList())

    const initialState = {
        street: {
            value: "",
            items: streets,
        },
        house: {
            value: "",
            items: [],
        },
        flat: {
            value: "",
            items: []
        }
    }

    const dispatch = useDispatch()
    const [data, setData] = useState(initialState)

    const changeHandler = (e) => {
        const newState = {...data, [e.name]: {...data[e.name], value: e.value} }
        setData(newState)
    }

    useEffect(() => {
        updateItems("street", streets)
    }, [streets])

    // Подтягиваем данные о улицах для autocomplete
    useEffect(() => {
        const streetValue = data.street.value
        const streetData = dispatch(getSearchStreetList(streetValue))
        updateItems("street", streetData)
    },[data.street.value])

    // Подтягиваем данные о домах для autocomplete
    useEffect(() => {
        const houseValue = data.house.value
        const houseData = dispatch(getSearchHouseList(houseValue))
        updateItems("house", houseData)
    },[data.house.value])

    // Подтягиваем данные о квартирах для autocomplete
    useEffect(() => {
        const flatValue = data.flat.value
        const response = dispatch(getSearchFlatList(flatValue))
        updateItems("flat", response)
    },[data.flat.value])

    // Функция для обновления dropdown списка
    const updateItems = (name, newItems) => {
        setData(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                items: newItems
            }
        }))
    }

    // Когда ввели данные о улице, мы подтягиваем данные о домах
    const onStreetBlur = async () => {
        const street = dispatch(getStreetByName(data.street.value))
        if (street) {
            const housesData = await dispatch(loadHousesList(street.id))
            updateItems("house", housesData)
        } else {
            updateItems("house", [])
        }
    }
    // Когда ввели данные о доме, мы подтягиваем данные о квартирах
    const onHouseBlur = async () => {
        const house = dispatch(getHouseByName(data.house.value))
        if (house) {
            const flatsData = await dispatch(loadFlatsList(house.id))
            updateItems("flat", flatsData)
        } else {
            updateItems("flat", [])
        }
    }

    const submitHandler = () => {
        const flat = dispatch(getFlatByName(data.flat.value))
        dispatch(loadClientsList({id: flat.id, address: `${data.street.value}, ${data.house.value}, ${data.flat.value}`}))
    }

    // базовая проверка на остуствие пустых строк
    const isValid =
        !(data.street.value.length === 0)
        && !(data.house.value.length === 0)
        && !(data.flat.value.length === 0)

    return (
        <div className="d-flex align-items-end mt-5">
            <InputWithAutocomplete
                onChange={changeHandler}
                value={data.street.value}
                name={"street"}
                items={data.street.items}
                onBlur={onStreetBlur}
                label={"Улица"}
            />
            <InputWithAutocomplete
                onChange={changeHandler}
                value={data.house.value}
                name={"house"}
                items={data.house.items}
                onBlur={onHouseBlur}
                label={"Дом"}
            />
            <InputWithAutocomplete
                onChange={changeHandler}
                value={data.flat.value}
                name={"flat"}
                items={data.flat.items}
                onBlur={() => {}}
                label={"Квартира"}
            />
            <Button disabled={!isValid} onClick={submitHandler}>Найти</Button>
        </div>
    );
};

export default AddressForm;
