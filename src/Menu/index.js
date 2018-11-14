import React from "react";
import NestableMenu from "./NestableMenu";
import SearchBar from "../search/SearchBar";
import { NavLink } from "react-router-dom";

const Menu = ({ tree, onSearch, name, visible, toggleVisibility }) => {
  const visiblityClasses = visible ? "sticky l0" : "absolute l-320px";
  return (
    <div class="h100vh bg-grey-300">
      <button onClick={toggleVisibility} className="absolute w100px">
        {visible ? "Open" : "Closed"}
      </button>

      <div className="fixed px3 min-h100vh bg-grey-300 scroll w320px t0 b0 ">
        <SearchBar onSearch={onSearch} name={name} />
        <div className="mb3">
          <NavLink to="/static" className="soft-black">
            Show all classes
          </NavLink>
          <ul>
            <NestableMenu data={tree} indent={false} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
