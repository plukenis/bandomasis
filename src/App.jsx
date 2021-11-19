import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./Components/List";
import Modal from "./Components/Modal";

function App() {
  const [table, setTable] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    registration_code: "",
    is_busy: "",
    last_use_time: "",
    total_ride_kilometers: "",
  });
//Read React
  useEffect(() => {
    axios
      .get("http://localhost:3003/scooters")
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);
//Update React
  const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/scooters/' + id, item)
    .then(res => {
        setLastUpdate(Date.now());
    })
    .catch((err)=> console.log(err));
}

  const modal = (item) => {
    setShowModal(true);
    setModalInputs(item);
  };

  const hide = () => {
    setShowModal(false);
  };
  
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">List of X</div>
              <div className="card-body">
                <table className="table">
                  <tr>
                    <th>registration code</th>
                    <th>is busy</th>
                    <th>last use time</th>
                    <th>total ride km</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  <Modal
                    showModal={showModal}
                    modalInputs={modalInputs}
                    hide={hide}
                    edit={edit}
                  />
                  <List table={table} modal={modal} />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;