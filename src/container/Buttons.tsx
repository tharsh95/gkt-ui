import { useState } from "react";
import Button from "../components/Button/Button";

type Props = {
  data: any;
  headCheck: boolean;
  checkedArray: number[];
  setCheckedArray: React.Dispatch<React.SetStateAction<number[]>>;
  setHeadCheck: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageRemove: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  pageRemove:number;
};

const Buttons = ({
  data,
  setHeadCheck,
  setCheckedArray,
  currentPage,
  setCurrentPage,
  checkedArray,
  setData,
  setPageRemove,
  pageRemove,

}: Props) => {
  const [userPerPage] = useState(10);
  const totalPages = Math.ceil(data.length / userPerPage);
  const handleClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    setHeadCheck(false);
    setCheckedArray([]);
  };
  const handleFirst = () => {
    setCurrentPage(1);
    setHeadCheck(false);
  };
  const handleLast = () => {
    setCurrentPage(Math.ceil(data.length / userPerPage));
    setHeadCheck(false);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setHeadCheck(false);
      setCheckedArray([]);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setHeadCheck(false);
    }
  };
  const handleRemove = () => {
    const newArray = data.filter(
      (item: any) => !checkedArray.includes(+item.id)
    );
    setHeadCheck(false);
    setPageRemove(pageRemove + 1);
    setData(newArray);
  };

  const buttonsToDisplay = 5;
  const halfButtons = Math.floor(buttonsToDisplay / 2);

  let startPage = Math.max(1, currentPage - halfButtons);
  let endPage = Math.min(totalPages, startPage + buttonsToDisplay - 1);

  if (endPage - startPage < buttonsToDisplay - 1) {
    startPage = Math.max(1, endPage - buttonsToDisplay + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
  return (
    <div className="btn">
      <div className="remove">
        <Button title="Delete Selected" handleClick={handleRemove} />
      </div>
      <Button
        title="<<"
        dClassName="pgebtn disabled"
        className="pgebtn"
        currentPage={currentPage}
        limit={1}
        handleClick={handleFirst}
        disabled={currentPage === 1}
      />
      <Button
        title="<"
        dClassName="pgebtn disabled"
        className="pgebtn"
        currentPage={currentPage}
        limit={1}
        handleClick={handlePrevClick}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          title={`${pageNumber}`}
          currentPage={currentPage}
          limit={pageNumber}
          dClassName="pgbtn"
          className="pgebtn"
          handleClick={() => handleClick(pageNumber)}
        />
      ))}
      <Button
        title=">"
        handleClick={handleNextClick}
        currentPage={currentPage}
        limit={Math.ceil(data.length / userPerPage)}
        dClassName="pgebtn disabled"
        className="pgebtn"
        disabled={currentPage === Math.ceil(data.length / userPerPage)}
      />
      <Button
        title=">>"
        currentPage={currentPage}
        limit={Math.ceil(data.length / userPerPage)}
        dClassName="pgebtn disabled"
        className="pgebtn"
        handleClick={handleLast}
        disabled={currentPage === Math.ceil(data.length / userPerPage)}
      />
    </div>
  );
};

export default Buttons;
