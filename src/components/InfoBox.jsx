import React from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./InfoBox.css";

const InfoControl = ({ feature }) => {
    const map = useMap();
    const party = [
        "Liberal",
        "Conservative",
        "New Democratic Party",
        "Bloc Québécois",
        "Others",
    ];

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
                            <table className="infobox-table">
                                <tr>
                                    <th>
                                        Party
                                    </th>
                                    <th>
                                        Vote
                                    </th>
                                    <th>
                                        Percentage
                                    </th>
                                </tr>
                                {party.map(
                                    (
                                        p
                                    ) => (
                                        <tr
                                            key={
                                                p
                                            }
                                        >
                                            <th>
                                                {
                                                    p
                                                }
                                            </th>
                                            <td>
                                                {
                                                    infobox[
                                                        `${p} Votes`
                                                    ]
                                                }
                                            </td>
                                            <td>
                                                {
                                                    infobox[
                                                        `${p} Votes Percentage`
                                                    ]
                                                }

                                                %
                                            </td>
                                        </tr>
                                    )
                                )}
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
