import {
  ChangeEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Data = {
  id: number;
  name: string;
  email: string;
  role: string;
};
type Prop = {
  data: Data[];
  headCheck: boolean;
  checkedArray: number[];
  setCheckedArray: React.Dispatch<React.SetStateAction<number[]>>;
  setHeadCheck: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  userPerPage: number;
  pageRemove: number;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  filteredData: Data[];

  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Table = ({
  data,
  headCheck,
  setHeadCheck,
  checkedArray,
  setCheckedArray,
  currentPage,
  userPerPage,
  pageRemove,
  setData,
  filteredData,
}: Prop) => {
  const [editableRow, setEditableRow] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [filter, setFilter] = useState("");
  const handleHeadChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      let firstIndex = userPerPage * (pageRemove - 1) + 1;
      let lastIndex =
        currentPage === 5 ? data.length : userPerPage * pageRemove;
      setHeadCheck(currentPage === +e.target.name);
      const resultArray = Array.from(
        { length: lastIndex - firstIndex + 1 },
        (_, index) => firstIndex + index
      );
      setCheckedArray(resultArray);
    } else {
      setCheckedArray([]);
      setHeadCheck(false);
    }
  };
  const handleCheck = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked === false) {
      const modifiedArray = checkedArray.filter((item) => item !== id);
      if (checkedArray.length - 1 !== userPerPage) {
        setHeadCheck(false);
        setCheckedArray(modifiedArray);
      } else {
        setCheckedArray(modifiedArray);
      }
    } else setCheckedArray([...checkedArray, id]);
  };
  const handleEditClick = (item: any) => {
    setEditableRow(item.id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
  };
  const handleDelete = (id: any) => {
    setData((data) => data.filter((el) => el.id !== id));
  };

  const handleSaveClick = (id: any) => {
    const update = { id, name, email, role };
    setData((data) => data.map((el) => (el.id === id ? update : el)));
    setEditableRow(null);
  };
  const indexOfLastPage = currentPage * userPerPage;
  const indexOfFirstPage = indexOfLastPage - userPerPage;
  const currentUser = data.slice(indexOfFirstPage, indexOfLastPage);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setFilter(e.target.value);
  };
  const handleSearch = (e: { key: string }) => {
    if (e.key === "Enter") {
      const filtered = filteredData.filter((user) => {
        if (
          user.name.toLowerCase().includes(filter?.toLowerCase()) ||
          user.email.toLowerCase().includes(filter?.toLowerCase()) ||
          user.role.toLowerCase().includes(filter?.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      console.log(filtered);
      setData(filtered);
    }
  };
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            onKeyDown={handleSearch}
            style={{
              border: "1px solid black",
              height: "40px",
              width: "83.5vw",
            }}
          />
        </div>
        <div>
          <button className="remove" onClick={() => console.log("enter")}>
            Search
          </button>
        </div>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleHeadChecked}
                name={String(currentPage)}
                checked={headCheck}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.map((item) => (
            <tr
              key={item.id}
              className={checkedArray.includes(+item.id) ? "disabled" : ""}
              style={{ border: "1px solid black", height: "3.5rem" }}
            >
              <td>
                <input
                  type="checkbox"
                  disabled={editableRow === item.id}
                  onChange={(e) => handleCheck(e, +item.id)}
                  checked={checkedArray.includes(+item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>
                {editableRow === item.id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={item.name}
                    style={{
                      width: "5rem",
                      border: "1px solid #015EFC",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editableRow === item.id ? (
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    defaultValue={item.email}
                    style={{
                      width: "9rem",
                      border: "1px solid #015EFC",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editableRow === item.id ? (
                  <select
                    id="dropdown"
                    name="dropdown"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: "5rem",
                      border: "1px solid #015EFC",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="member">member</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  item.role
                )}
              </td>
              <td>
                {editableRow !== item.id && (
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="edit"
                      >
                        <img src="src/assets/edit.svg" alt="edit" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="delete"
                      >
                        <img src="src/assets/delete.svg" alt="delete" />
                      </button>
                    </div>
                  </div>
                )}
                {editableRow === item.id && (
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>
                      <button
                        onClick={() => handleSaveClick(item.id)}
                        className="save"
                      >
                        <img src="src/assets/tick.svg" alt="save" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setEditableRow(null)}
                        className="cancel"
                      >
                        <img src="src/assets/cross.svg" alt="cancel" />
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
