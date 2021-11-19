function Item({ scooters, modal }) {
    const showEdit = () => {
      modal(scooters);
    };
  
    return (
      <div className="main__list__item">
        <div className="main__list__item__name">
          <span>
            <i>Item name: </i> {scooters.product}
          </span>
        </div>
        <div className="main__list__item__quantity">
          <span>
            <i>Quantity: </i> {scooters.quantity}
          </span>
        </div>
        <div className="main__list__item__price">
          <span>
            <i>Price: </i> {scooters.price} Eur
          </span>
        </div>
        <div className="main__list__item__lastOrder">
          <span>
            <i>Last order: </i> {scooters.last_order.slice(0, 10)}
          </span>
        </div>
        <button onClick={showEdit}>Edit</button>
      </div>
    );
  }
  
  export default Item;