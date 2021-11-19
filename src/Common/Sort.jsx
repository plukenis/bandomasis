function itemSort(state, by) {
  const scooter = state.slice();

  switch (by) {
    case "registration_code_name_asc":
      scooter.sort((a, b) => {
        const nameA = a.registration_code.toUpperCase();
        const nameB = b.registration_code.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      break;
    case "registration_code_name_desc":
      scooter.sort((a, b) => {
        const nameA = a.registration_code.toUpperCase();
        const nameB = b.registration_code.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      break;
    case "last_use_time_asc":
      scooter.sort(function (a, b) {
        return a.last_use_time - b.last_use_time;
      });
      break;
    case "last_use_time_desc":
      scooter.sort(function (a, b) {
        return b.last_use_time - a.last_use_time;
      });
      break;
    default:
  }
  return scooter;
}
export default itemSort;
