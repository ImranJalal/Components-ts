import React from 'react';
import "./Header.css";
export const Header = () => {
  return (
    <div>
      <nav className="nav">
        <a href="/" className="Site-Name">Military Documentation </a>
        <ul>
          <li className="active">
            <a href="https://stackoverflow.com/questions/7755088/what-does-href-expression-a-href-javascript-a-do" className="Home">Home </a>
          </li>
          <li className="active">
            <a href="https://www.w3schools.com/js/default.asp" className="About">About </a>
          </li>
          <li className="active">
            <a href="https://www.google.com/" className="Contract">Contact </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

