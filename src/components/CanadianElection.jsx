import React from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from "react-leaflet";
import districts from "../assets/canadianelection/districts.json";
import results from "../assets/canadianelection/election_result.json";
import "leaflet/dist/leaflet.css";
import "./CanadianElection.css";

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

        const infobox = `
    <div class="infobox">
      <h3>${electionResult["Electoral District Name"]}, ${electionResult["Province"]}</h3>
      <table>
        <tr>
          <th>Party</th>
          <th>Votes</th>
          <th>Percentage</th>
        </tr>
        <tr>
          <td class="party">Liberal</td>
          <td>${electionResult["Liberal Votes"]}</td>
          <td>${electionResult["Liberal Votes Percentage"]}%</td>
        </tr>
        <tr>
          <td class="party">Conservative</td>
          <td>${electionResult["Conservative Votes"]}</td>
          <td>${electionResult["Conservative Votes Percentage"]}%</td>
        </tr>
        <tr>
          <td class="party">NDP</td>
          <td>${electionResult["New Democratic Party Votes"]}</td>
          <td>${electionResult["New Democratic Party Votes Percentage"]}%</td>
        </tr>
        <tr>
          <td class="party">Bloc Québécois</td>
          <td>${electionResult["Bloc Québécois Votes"]}</td>
          <td>${electionResult["Bloc Québécois Votes Percentage"]}%</td>
        </tr>
        <tr>
          <td class="party">Others</td>
          <td>${electionResult["Others Votes"]}</td>
          <td>${electionResult["Others Votes Percentage"]}%</td>
        </tr>
      </table>
    </div>
  `;

        layer.bindPopup(infobox, {
            maxWidth: 200,
            maxHeight: 200,
        });
        layer.on({
            mouseover: (event) => {
                layer = event.target;
                const latLng =
                    event.latlng;

                layer.setLatLng([
                    latLng.lat - 0.001,
                    latLng.lng,
                ]);

                layer.openPopup();
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
