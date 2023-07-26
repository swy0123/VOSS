import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';


function OrderDropBtn() {

  const orders = ["최신순", "조회순", "좋아요순"];
  const [curorder, setCurorder] = useState("최신순");
  const setDropdown = (select: string) => {select == curorder ? null : setCurorder(select)}

  return (
    <DropdownButton id="dropdown-basic-button" className="me-1" title={curorder} variant="secondary" data-bs-theme="dark" >
      {orders.map((order) => (
      <Dropdown.Item onClick={() => setDropdown(order)}>{order}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default OrderDropBtn;