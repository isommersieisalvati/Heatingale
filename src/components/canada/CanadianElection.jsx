import React, {
    useState,
    useEffect,
} from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Circle,
    Popup,
    GeoJSON,
} from "react-leaflet";
import districts from "../../assets/canadianelection/districts.json";
import results from "../../assets/canadianelection/election_result.json";
import "leaflet/dist/leaflet.css";
import "./CanadianElection.css";
import InfoBox from "./InfoBox";
import Legend from "./Legend";

const CanadianElection = () => {
    const [infobox, setInfobox] =
        useState(null);
    const party = {
        Liberal: "#ff5765",
        Conservative: "#8a6fdf",
        "New Democratic Party":
            "#feb06a",
        "Bloc Québécois": "#36d6e7",
        Others: "#fb8da0",
    };

    useEffect(() => {
        document.title =
            "Canadian Federal Election | Heatingale";
    }, []);

    const getElectionResult = (
        fedCode
    ) => {
        const party = results.find(
            (result) =>
                result[
                    "Electoral District Number"
                ] === parseInt(fedCode)
        );
        return party
            ? party
            : "No result found for the given fed_code";
    };

    const style = (feature) => {
        const electionResult =
            getElectionResult(
                feature.properties
                    .fed_code
            )[
                "Elected Candidate Party"
            ];

        let fillColor =
            party[electionResult];

        return {
            weight: 2,
            dashArray: "3",
            color: "white",
            fillColor,
            fillOpacity: 0.4,
        };
    };

    const onEachFeature = (
        feature,
        layer
    ) => {
        layer.on({
            mouseover: (e) => {
                setInfobox(
                    getElectionResult(
                        feature
                            .properties
                            .fed_code
                    )
                );
            },
            mouseout: (e) => {
                setInfobox(null);
            },
        });
    };

    return (
        <div className="election">
            <h2 className="election-title">
                2021 Canadian Federal
                Election
            </h2>
            <MapContainer
                center={[
                    56.1304, -106.3468,
                ]}
                zoom={3}
                className="election-map"
            >
                <InfoBox
                    feature={infobox}
                />
                <Legend party={party} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    data={districts}
                    style={style}
                    onEachFeature={
                        onEachFeature
                    }
                />
            </MapContainer>
        </div>
    );
};

export default CanadianElection;
