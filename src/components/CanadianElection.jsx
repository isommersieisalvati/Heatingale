import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from "react-leaflet";
import districts from "../assets/canadianelection/districts.json";
import results from "../assets/canadianelection/election_result.json";
import "leaflet/dist/leaflet.css";
import "./CanadianElection.css";
import InfoBox from "./InfoBox";

const CanadianElection = () => {
    const [infobox, setInfobox] =
        useState(null);

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
            fillColor = "#ff5765"; // Party A color
        } else if (
            electionResult ===
            "Conservative"
        ) {
            fillColor = "#8a6fdf"; // Party B color
        } else if (
            electionResult ===
            "New Democratic Party"
        ) {
            fillColor = "#feb06a"; // Party C color
        } else if (
            electionResult ===
            "Bloc Québécois"
        ) {
            fillColor = "#36d6e7";
        } else if (
            electionResult === "Others"
        ) {
            fillColor = "#fb8da0";
        } else {
            fillColor = "gray";
        }

        return {
            weight: 1,
            color: "black",
            fillColor,
            fillOpacity: 0.6,
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
        <>
            <h2>
                2021 Canadian Federal
                Election
            </h2>
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
                <InfoBox
                    feature={infobox}
                />
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
        </>
    );
};

export default CanadianElection;
