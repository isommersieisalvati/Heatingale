import React from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Legend.css";

const Legend = ({ party }) => {
    const map = useMap();

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <div className="legend">
                    {Object.entries(
                        party
                    ).map(
                        ([
                            name,
                            color,
                        ]) => (
                            <div
                                className="legend-item"
                                key={
                                    name
                                }
                            >
                                <div
                                    className="legend-color-box"
                                    style={{
                                        backgroundColor:
                                            color,
                                    }}
                                ></div>
                                <span className="legend-party">
                                    {
                                        name
                                    }
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Legend;
