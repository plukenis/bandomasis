import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Modal from "./Components/Modal";
import NewScooter from "./Components/NewScooter";
import Scooters from "./Components/Scooters";
import ActionMsg from "./Components/ActionMsg";

function App() {
  // Testas
  // useEffect(() => {
  //   axios.get('http://localhost:3003/test')
  //     .then(res => {
  //       console.log(res.data);
  //     })
  // }, [])
  // -------------------------------------------------------
  const [scooters, setScooters] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // ----------------- ACTION MESSAGES -----------------
  const [showMsg, setShowMsg] = useState(false);
  const msg = useRef("");

  const addMsg = (text) => {
    msg.current = text;
    setShowMsg(true);
    setTimeout(() => {
      clearMsg();
    }, 2000);
  };

  const clearMsg = () => {
    setShowMsg(false);
  };

  // Read node
  useEffect(() => {
    axios.get("http://localhost:3003/scooters").then((res) => {
      setScooters(res.data);
      console.log(res.data);
    });
  }, [lastUpdate]);

  // Delete node
  const deleteScooter = (id) => {
    setShowModal(false);
    axios.delete("http://localhost:3003/scooters/" + id).then((res) => {
      addMsg('successfully removed');
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };
  // -----------------------------------------
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    registration_code: "",
    is_busy: false,
    last_use_time: "",
    total_ride_kilometers: "",
    one_day_ride: "",
  });

  const modal = (scooter) => {
    setShowModal(true);
    setModalElement(scooter);
  };

  const hide = () => {
    setShowModal(false);
  };
  // -------------------------------------------------
  // Edit node
  const edit = (scooter, id) => {
    setShowModal(false);
    axios.put("http://localhost:3003/scooters/" + id, scooter).then((res) => {
      addMsg('successfully saved');  
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  // Create Node
  const create = (scooter) => {
    axios.post("http://localhost:3003/scooters", scooter).then((res) => {
      addMsg('successfully added');  
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  return (
    <div className="general">
      <ActionMsg msg={msg.current} showMsg={showMsg}></ActionMsg>
      <h1>
        {" "}
        <span>Kolt</span> scooters rent
      </h1>
      <NewScooter create={create} />
      <Modal
        showModal={showModal}
        hide={hide}
        modalElement={modalElement}
        deleteScooter={deleteScooter}
        edit={edit}
      />
      <Scooters
        scooters={scooters}
        deleteScooter={deleteScooter}
        modal={modal}
      />
    </div>
  );
}
export default App;
