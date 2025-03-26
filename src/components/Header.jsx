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
                        Canada
                        {openDropdown ===
                            "nav1" && (
                            <ul className="dropdown">
                                <li className="dropdown-item">
                                    <Link to="/canadian_politics">
                                        Federal
                                        Elections
                                    </Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link to="/canadian_politics">
                                        BC
                                        Elections
                                    </Link>
                                </li>
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
                        Fandom
                        {openDropdown ===
                            "nav2" && (
                            <ul className="dropdown">
                                <li className="dropdown-item">
                                    <Link to="/fandom">
                                        Race
                                        Bar
                                        Chart
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
