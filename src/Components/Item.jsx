function Item({ scooters, modal }) {
  const showEdit = () => {
    modal(scooters);
  };

  return (
    <div className="main__list__item">
      <div className="main__list__item__name">
        <span>
          <i>reg code: </i> {scooters.registration_code}
        </span>
      </div>
      <div className="main__list__item__quantity">
        <span>
          <i>busy yes no: </i> {scooters.is_busy}
        </span>
      </div>
      <div className="main__list__item__price">
        <span>
          <i>use time: </i> {scooters.last_use_time}
        </span>
      </div>
      <div className="main__list__item__lastOrder">
        <span>
          <i>kilos: </i> {scooters.total_ride_kilometers}
        </span>
      </div>
      <button onClick={showEdit}>Edit</button>
    </div>
  );
}

export default Item;