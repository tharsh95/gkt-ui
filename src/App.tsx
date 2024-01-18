import { SetStateAction, useEffect, useState } from "react";
import "./App.css"; // Import your external CSS file
import axios from "axios";
import Table from "./container/Table";
import Buttons from "./container/Buttons";
type Data = {
  id: number;
  name: string;
  email: string;
  role: string;
};
const MyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRemove, setPageRemove] = useState(currentPage);
  const [userPerPage] = useState(10);
  const [checkedArray, setCheckedArray] = useState<number[]>([]);
  const [headCheck, setHeadCheck] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData ] = useState<Data[]>([]);
  const [filter, setFilter] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(res.data);
      setFilteredData(res.data)
    };
    fetchData();
  }, []);

  const handleChange = (e: { target: { value: SetStateAction<any> } }) => {
    setFilter(e.target.value);

    console.log(e.target.value);
  };
  const filteredUsers=[]
  return (
    <div className="container">
    
      <>
     

        <Table
        filteredData={filteredData}
          data={data}
          checkedArray={checkedArray}
          setCheckedArray={setCheckedArray}
          headCheck={headCheck}
          setHeadCheck={setHeadCheck}
          currentPage={currentPage}
          userPerPage={userPerPage}
          pageRemove={pageRemove}
          setData={setData}
        />
      </>

      {data.length !== 0 && (
        <Buttons
          setPageRemove={setPageRemove}
          pageRemove={pageRemove}
          data={data}
          setData={setData}
          checkedArray={checkedArray}
          setCheckedArray={setCheckedArray}
          headCheck={headCheck}
          setHeadCheck={setHeadCheck}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyTable;
