import { useState } from "react";

function Nav({ reset, search, sort, filter, types }) {
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const selectFilter = (e) => {
    setFilterValue(e.target.value);
    filter(e.target.value);
  };

  const selectSort = (e) => {
    setSortValue(e.target.value);
    sort(e.target.value);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    search(e.target.value);
  };

  const resetHandler = () => {
    reset();
    setFilterValue("");
  };

  return (
    <div className="main__nav">
      <div className="main__nav__filter">
        <span>Sort products by:</span>
        <select onChange={selectSort} value={sortValue}>
          <option value="">Select</option>
          <option value="registration_code_name_asc">
            By name - from A to Z
          </option>
          <option value="registration_code_name_desc">
            By name - from Z to A
          </option>
          <option value="last_use_time_asc">By price - from smallest</option>
          <option value="last_use_time_desc">By price - from biggest</option>
        </select>
      </div>
      <div className="main__nav__filter">
        <span>Filter by registration_code name</span>
        <select onChange={selectFilter} value={filterValue}>
          <option value="">Select item</option>
          {types.map((t) => (
            <option key={t.registration_code} value={t.registration_code}>
              {t.registration_code}
            </option>
          ))}
        </select>
      </div>
      <div className="main__nav__filter">
        <span>Search</span>
        <input onChange={handleSearchValue} value={searchValue}></input>
      </div>
      <div className="main__nav__reset">
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
}

export default Nav;
