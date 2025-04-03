import React, { useState } from "react";
import "./RaceBarChart.css";

const RaceBarChart = () => {
    const charts = [
        {
            id: 1,
            title: "All Fandoms",
            visualizationId: "20753903",
        },
        {
            id: 2,
            title: "Middle Earth",
            visualizationId: "20787513",
        },
        {
            id: 3,
            title: "Marvel",
            visualizationId: "20609784",
        },
    ];

    const [
        selectedChart,
        setSelectedChart,
    ] = useState(charts[0]);

    const handleTabClick = (
        chartId
    ) => {
        const selectedTab = charts.find(
            (tab) => tab.id === chartId
        );
        setSelectedChart(selectedTab);
    };

    return (
        <div className="racebarchart">
            <div className="racebarchart-title">
                Number of Fanworks by
                Year (On AO3)
            </div>
            <div className="racebarchart-graph">
                <div className="racebarchart-tabs">
                    {charts.map(
                        (tab) => (
                            <button
                                className={`racebarchart-tab ${
                                    selectedChart.id ===
                                    tab.id
                                        ? "active"
                                        : ""
                                }`}
                                key={
                                    tab.id
                                }
                                id={
                                    tab.id
                                }
                                onClick={() => {
                                    handleTabClick(
                                        tab.id
                                    );
                                }}
                            >
                                {
                                    tab.title
                                }
                            </button>
                        )
                    )}
                </div>
                {charts.map((chart) => {
                    if (
                        chart.visualizationId ==
                        selectedChart.visualizationId
                    ) {
                        return (
                            <div>
                                <iframe
                                    src={`https://flo.uri.sh/visualisation/${chart.visualizationId}/embed`}
                                    title="Interactive or visual content"
                                    className="flourish-embed-iframe"
                                    sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                                ></iframe>
                                <div>
                                    <a
                                        class="flourish-credit"
                                        href={`https://public.flourish.studio/visualisation/${chart.visualizationId}/?utm_source=embed&utm_campaign=visualisation/${chart.visualizationId}`}
                                        target="_top"
                                    >
                                        <img
                                            alt="Made with Flourish"
                                            src="https://public.flourish.studio/resources/made_with_flourish.svg"
                                        />
                                    </a>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default RaceBarChart;
