import React, {useEffect} from 'react';
import requestService from "../services/request.service";
import AddressForm from "../components/addressForm";
import FlatPanel from "../components/flatPanel";

const MainPage = () => {

    return (
        <div>
            <AddressForm/>
            <FlatPanel />
        </div>
    );
};

export default MainPage;
