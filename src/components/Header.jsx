import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [
        openDropdown,
        setOpenDropdown,
    ] = useState(null);

    const handleMouseEnter = (menu) => {
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <header>
            <div className="title">
                <h1 className="heatingale-title">
                    <a href="/">
                        Heatingale
                    </a>
                </h1>
                <h2 className="heatingale-summary">
                    Data Visualization
                    Gallery by
                    Isommersieisalvati
                </h2>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li
                        className="nav-item"
                        onMouseEnter={() =>
                            handleMouseEnter(
                                "nav1"
                            )
                        }
                        onMouseLeave={
                            handleMouseLeave
                        }
                    >
                        <Link to="/canadian_politics">
                            Canada
                        </Link>

                        {openDropdown ===
                            "nav1" && (
                            <ul className="dropdown">
                                <li className="dropdown-item">
                                    <a href="/canadian_politics">
                                        Federal
                                        Elections
                                    </a>
                                </li>
                                {/* <li className="dropdown-item">
                                    <a href="/canadian_politics">
                                        BC
                                        Elections
                                    </a>
                                </li> */}
                            </ul>
                        )}
                    </li>
                    <li
                        className="nav-item"
                        onMouseEnter={() =>
                            handleMouseEnter(
                                "nav2"
                            )
                        }
                        onMouseLeave={
                            handleMouseLeave
                        }
                    >
                        <Link to="/fandom">
                            Fandom
                        </Link>
                        {/* {openDropdown ===
                            "nav2" && (
                            <ul className="dropdown">
                                <li className="dropdown-item">
                                    <a href="/fandom">
                                        
                                    </a>
                                </li>
                            </ul>
                        )} */}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
