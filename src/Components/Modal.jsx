import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, remove }) {
  const [inputs, setInputs] = useState({
    registration_code: "",
    is_busy: "",
    last_use_time: "",
    total_ride_kilometers: "",
  });

  const control = (e, what) => {
    const inputsCopy = { ...inputs };
    inputsCopy[what] = e.target.value;
    setInputs(inputsCopy);
  };

  useEffect(() => {
    setInputs({
      registration_code: modalElement.registration_code,
      is_busy: modalElement.is_busy,
      last_use_time: modalElement.last_use_time,
      total_ride_kilometers: modalElement.total_ride_kilometers.slice(0, 10),
    });
  }, [modalElement]);

  const handleEdit = () => {
    edit(
      {
        registration_code: inputs.registration_code,
        is_busy: inputs.is_busy,
        last_use_time: inputs.last_use_time,
        total_ride_kilometers: inputs.total_ride_kilometers,
      },
      modalElement.id
    );
  };

  const handleRemove = () => {
    remove(modalElement.id);
    console.log(modalElement.id);
  };

  return (
    <div
      className="main__modal"
      style={{
        display: showModal ? "flex" : "none",
      }}
    >
      <div className="main__form">
        <h2>Edit scooter</h2>
        <div className="main__form__input">
          <span>Edit reg code: </span>{" "}
          <input
            type="text"
            value={inputs.registration_code}
            onChange={(e) => control(e, "registration_code")}
          />
        </div>
        <div className="main__form__input">
          <span>Edit if busy: </span>{" "}
          <input
            type="text"
            value={inputs.is_busy}
            onChange={(e) => control(e, "is_busy")}
          />
        </div>
        <div className="main__form__input">
          <span>Edit last use time: </span>{" "}
          <input
            type="text"
            value={inputs.last_use_time}
            onChange={(e) => control(e, "last_use_time")}
          />
        </div>
        <div className="main__form__input">
          <span>Edit total ride km: </span>{" "}
          <input
            type="date"
            value={inputs.total_ride_kilometers}
            onChange={(e) => control(e, "total_ride_kilometers")}
          />
        </div>
        <div className="main__form__input__buttons"></div>
        <button onClick={handleEdit}>Save</button>
        <button onClick={handleRemove}>Delete</button>
        <button onClick={hide}>Cancel</button>
      </div>
    </div>
  );
}
export default Modal;
