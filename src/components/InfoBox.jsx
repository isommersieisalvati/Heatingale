import React from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./InfoBox.css";

const InfoControl = ({ feature }) => {
    const map = useMap();

    const infobox = feature;

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <div className="infobox">
                    {infobox ? (
                        <div>
                            <h4 className="infobox-title">
                                {
                                    infobox[
                                        [
                                            "Electoral District Name",
                                        ]
                                    ]
                                }
                                ,{" "}
                                {
                                    infobox[
                                        "Province"
                                    ]
                                }
                            </h4>
                            <table>
                                <tr>
                                    <th>
                                        Party
                                    </th>
                                    <th>
                                        Vote
                                        Count
                                    </th>
                                    <th>
                                        Percentage
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Liberal
                                    </th>
                                    <td>
                                        {
                                            infobox[
                                                "Liberal Votes"
                                            ]
                                        }
                                    </td>
                                    <td>
                                        {
                                            infobox[
                                                "Liberal Votes Percentage"
                                            ]
                                        }
                                        %
                                    </td>
                                </tr>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <h4>
                                2021
                                Canadian
                                Federal
                                Election
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoControl;
