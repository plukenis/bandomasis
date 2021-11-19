import Item from "./Item";

function List({ scooter, modal }) {
  return (
    <>
      {scooter.map((scooters) => (
        <Item 
        key={scooters.id} 
        scooters={scooters} 
        modal={modal}>
        </Item>
      ))}
    </>
  );
}

export default List;
