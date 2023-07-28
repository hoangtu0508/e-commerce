import React, { useState } from 'react';
import './drop.scss'

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={handleClick}>
        Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;