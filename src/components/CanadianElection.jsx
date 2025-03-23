import React from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from "react-leaflet";
import districts from "../assets/districts.json";
import results from "../assets/election_result.json";
import "leaflet/dist/leaflet.css";

const CanadianElection = () => {
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

        let fillColor;
        if (
            electionResult === "Liberal"
        ) {
            fillColor = "red"; // Party A color
        } else if (
            electionResult ===
            "Conservative"
        ) {
            fillColor = "blue"; // Party B color
        } else if (
            electionResult ===
            "New Democratic Party"
        ) {
            fillColor = "green"; // Party C color
        } else if (
            electionResult ===
            "Bloc Québécois"
        ) {
            fillColor = "yellow"; // Party D color
        } else {
            fillColor = "gray"; // Default color if no match
        }

        return {
            weight: 1,
            color: "black",
            fillColor,
            fillOpacity: 0.6,
        };
    };

    return (
        <>
            <MapContainer
                center={[
                    56.1304, -106.3468,
                ]}
                zoom={3}
                style={{
                    height: "500px",
                    width: "700px",
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    data={districts}
                    style={style}
                />
            </MapContainer>
            ;
        </>
    );
};

export default CanadianElection;
