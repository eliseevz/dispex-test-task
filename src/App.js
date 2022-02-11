import React, {useEffect} from "react"
import MainPage from "./pages/mainPage";
import {useDispatch} from "react-redux";
import {loadStreetsList} from "./store/streets";
import ModalClientProvider from "./hooks/useModalClient";


function App() {

    const dispatch = useDispatch()

    const fetchStreets = (params) => {
        dispatch(loadStreetsList())
    }

    useEffect(() => {
        fetchStreets()
    }, [])

  return (
      <ModalClientProvider>
          <div className="App container">
              <MainPage/>
          </div>
      </ModalClientProvider>
  );
}

export default App;
