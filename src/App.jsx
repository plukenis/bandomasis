import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./Components/List";
import Modal from "./Components/Modal";
import Item from "./Components/Item";
import itemSort from "./Common/Sort";
import Nav from "./Components/Nav";

function App() {
  //sitas state laiko kas yra /jewelery
  const [scooter, setScooter] = useState([]);
  //sitas reikalingas useffect kad updatintusi
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    registration_code: "",
    is_busy: "",
    last_use_time: "",
    total_ride_kilometers: "",
  });

  // const sortBy= useRef('');

  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/scooters-registration_code")
      .then((res) => {
        setTypes(res.data);
      });
  }, [lastUpdate]);

  // date formating

  const dateOnly = (data) => {
    return data.map((a) => {
      a.total_ride_kilometers = a.total_ride_kilometers.slice(0, 10);
      return a;
    });
  };

  // SORT pridejimas

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (sortBy) {
      setScooter(itemSort(scooter, sortBy));
    }
  }, [sortBy]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/scooters")
      .then((res) => {
        setScooter(dateOnly(res.data));
        setTypes(res.data.filter((a) => a.registration_code));
      })
      .catch((err) => console.log(err));
  }, [lastUpdate]);

  // SEARCH pridejimas

  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    if (searchBy) {
      axios
        .get("http://localhost:3003/scooters-registration_code/?s=" + searchBy)
        .then((res) => {
          setScooter(dateOnly(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [searchBy]);

  // FILTER pridejimas

  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    if (filterBy) {
      axios
        .get("http://localhost:3003/scooters-filter/" + filterBy)
        .then((res) => {
          setScooter(dateOnly(res.data));
        });
    }
  }, [filterBy]);

  const reset = () => {
    setLastUpdate(Date.now());
  };

  // ALL RECORDS

  useEffect(() => {
    axios.get("http://localhost:3003/scooters").then((res) => {
      setScooter(res.data);
      // console.log(res.data);
    });
  }, [lastUpdate]);

  // create RECORD

  const create = (scooters) => {
    axios.post("http://localhost:3003/scooters", scooters).then((res) => {
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  // edit RECORD

  const edit = (scooters, id) => {
    setShowModal(false);
    axios.put("http://localhost:3003/scooters/" + id, scooters).then((res) => {
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  // remove RECORD

  const remove = (id) => {
    setShowModal(false);
    axios.delete("http://localhost:3003/scooters/" + id).then((res) => {
      setLastUpdate(Date.now());
      console.log(res.data);
    });
  };

  // modal  show/hide

  const modal = (scooters) => {
    setShowModal(true);
    setModalElement(scooters);
  };

  const hide = () => {
    setShowModal(false);
  };

  return (
    <div className="main">
      <Modal
        showModal={showModal}
        hide={hide}
        modalElement={modalElement}
        edit={edit}
        remove={remove}
      ></Modal>
      <Nav
        types={types}
        search={setSearchBy}
        filter={setFilterBy}
        sort={setSortBy}
        reset={reset}
      ></Nav>
      <List scooter={scooter} modal={modal}></List>
      <Item create={create}></Item>
    </div>
  );
}

export default App;
