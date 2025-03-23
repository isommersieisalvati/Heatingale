import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from "react-leaflet";
import districts from "../assets/canadianelection/districts.json";
import results from "../assets/canadianelection/election_result.json";
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
        const electionResult =
            getElectionResult(
                feature.properties
                    .fed_code
            );
        layer.on({
            mouseover: () => {
                layer
                    .bindPopup(
                        `
      <strong>District:</strong> ${
          electionResult[
              "Electoral District Name"
          ]
      }, ${
                            electionResult[
                                "Province"
                            ]
                        }<br>
      <strong>Liberal Votes:</strong> ${
          electionResult[
              "Liberal Votes"
          ]
      }<br>
      <strong>Conservative Votes:</strong> ${
          electionResult[
              "Conservative Votes"
          ]
      }<br>
      <strong>NDP Votes:</strong> ${
          electionResult[
              "New Democratic Party Votes"
          ]
      }<br>
      <strong>Bloc Québécois Votes:</strong> ${
          electionResult[
              "Bloc Québécois Votes"
          ] || "N/A"
      }<br>
      <strong>Others Votes:</strong> ${
          electionResult["Others Votes"]
      }
      `
                    )
                    .openTooltip();
            },
            mouseout: () => {
                // Hide the tooltip when the mouse leaves the district
                layer.closeTooltip();
            },
        });
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
                    onEachFeature={
                        onEachFeature
                    }
                />
            </MapContainer>
            ;
        </>
    );
};

export default CanadianElection;
