import React, {
    useEffect,
    useRef,
} from "react";
import "./FederalElectionTurnout.css";
import * as d3 from "d3";

const FederalElectionTurnout = () => {
    const svgRef = useRef();

    const width = 500;
    const height = 500;

    const data = [
        { year: 1867, turnout: 73.1 },
        { year: 1872, turnout: 70.3 },
        { year: 1874, turnout: 69.6 },
        { year: 1878, turnout: 69.1 },
        { year: 1882, turnout: 70.3 },
        { year: 1887, turnout: 70.1 },
        { year: 1891, turnout: 64.4 },
        { year: 1896, turnout: 62.9 },
        { year: 1898, turnout: 44.6 },
        { year: 1900, turnout: 77.4 },
        { year: 1904, turnout: 71.6 },
        { year: 1908, turnout: 70.3 },
        { year: 1911, turnout: 70.2 },
        { year: 1917, turnout: 75.0 },
        { year: 1921, turnout: 67.7 },
        { year: 1925, turnout: 66.4 },
        { year: 1926, turnout: 67.7 },
        { year: 1930, turnout: 73.5 },
        { year: 1935, turnout: 74.2 },
        { year: 1940, turnout: 69.9 },
        { year: 1942, turnout: 71.3 },
        { year: 1945, turnout: 75.3 },
        { year: 1949, turnout: 73.8 },
        { year: 1953, turnout: 67.5 },
        { year: 1957, turnout: 74.1 },
        { year: 1958, turnout: 79.4 },
        { year: 1962, turnout: 79.0 },
        { year: 1963, turnout: 79.2 },
        { year: 1965, turnout: 74.8 },
        { year: 1968, turnout: 75.7 },
        { year: 1972, turnout: 76.7 },
        { year: 1974, turnout: 71.0 },
        { year: 1979, turnout: 75.7 },
        { year: 1980, turnout: 69.3 },
        { year: 1984, turnout: 75.3 },
        { year: 1988, turnout: 75.3 },
        { year: 1992, turnout: 71.8 },
        { year: 1993, turnout: 69.6 },
        { year: 1997, turnout: 67.0 },
        { year: 2000, turnout: 61.2 },
        { year: 2004, turnout: 60.9 },
        { year: 2006, turnout: 64.7 },
        { year: 2008, turnout: 58.8 },
        { year: 2011, turnout: 61.1 },
        { year: 2015, turnout: 68.3 },
        { year: 2019, turnout: 67.0 },
        { year: 2021, turnout: 62.6 },
    ];
    const avg = d3.median(
        data,
        (d) => d.turnout
    );
    const min = d3.min(
        data,
        (d) => d.turnout
    );
    const max = d3.max(
        data,
        (d) => d.turnout
    );

    useEffect(() => {
        const svg = d3.select(
            svgRef.current
        );
        svg.selectAll("*").remove(); // Clear before redraw

        const radius =
            Math.min(width, height) / 2;
        const centerX = width / 2;
        const centerY = height / 2;

        const g = svg
            .append("g")
            .attr(
                "transform",
                `translate(${centerX}, ${centerY})`
            );

        const rScale = d3
            .scaleLinear()
            .domain([0, 40, 90]) // full range: 0–100%
            .range([
                0,
                radius * 0.2,
                radius,
            ]); // 0–50% compressed, 50–100% proportional

        const axisGroup = g.append("g");

        // Define ticks to show
        const tickValues = [
            40, 50, 60, 70, 80,
        ];

        const axisX = 0; // vertical line at x = 0

        // Draw the vertical axis line (upward)
        axisGroup
            .append("line")
            .attr("x1", axisX)
            .attr("y1", -rScale(80))
            .attr("x2", axisX)
            .attr("y2", -rScale(40))
            .attr("stroke", "#999")
            .attr("stroke-width", 2.5);

        // Add tick labels to the left of the line
        tickValues.forEach((t) => {
            const y = -rScale(t); // upward = negative y

            axisGroup
                .append("text")
                .attr("x", -8) // left of the axis
                .attr("y", y - 5)
                .attr(
                    "text-anchor",
                    "end"
                )
                .attr(
                    "alignment-baseline",
                    "middle"
                )
                .attr(
                    "font-size",
                    "10px"
                )
                .attr("fill", "#666")
                .text(`${t}%`);
        });

        const total = data.length;
        const angleStep = 7; // degrees per bar
        const startDeg = 10; // desired starting angle in degrees

        // Convert degrees to radians and rotate so 0° is straight up
        const angle = (deg) =>
            (deg - 90) *
            (Math.PI / 180);

        const colorScale = d3
            .scaleDiverging()
            .domain([min, avg, max])
            .interpolator(
                d3.interpolateRgbBasis([
                    "#0000FF",
                    "#eeeeee",
                    "#006400",
                ])
            );

        // Draw bars
        data.forEach((d, i) => {
            const baseline = 40; // start showing bars from 50%
            // the inner radius of the bar
            const r0 = rScale(baseline);

            const currentDeg =
                startDeg +
                i * angleStep;
            const theta =
                angle(currentDeg); // angle in radians
            const barLength = rScale(
                d.turnout
            );

            const r1 = rScale(
                d.turnout
            ); // outer radius
            if (r1 <= r0) return; // skip if below 50%

            const x1 =
                Math.cos(theta) * r0;
            const y1 =
                Math.sin(theta) * r0;
            const x2 =
                Math.cos(theta) * r1;
            const y2 =
                Math.sin(theta) * r1;

            g.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr(
                    "stroke",
                    colorScale(
                        d.turnout
                    )
                )
                .attr(
                    "stroke-width",
                    5
                );

            g.append("text")
                .attr(
                    "x",
                    Math.cos(theta) *
                        (barLength + 15)
                )
                .attr(
                    "y",
                    Math.sin(theta) *
                        (barLength + 15)
                )
                .attr(
                    "text-anchor",
                    "middle"
                )
                .attr(
                    "alignment-baseline",
                    "middle"
                )
                .attr(
                    "font-size",
                    "10px"
                )
                .text(d.year);
        });

        // Optional: radial axis circles for reference
        const refGroup = g.append("g");
        [40, 50, 60, 70, 80].forEach(
            (t) => {
                const r = rScale(t);
                refGroup
                    .append("circle")
                    .attr("r", r)
                    .attr(
                        "stroke",
                        "#bbb"
                    ) // softer gray
                    .attr(
                        "stroke-dasharray",
                        "4, 2"
                    ) // dashed line pattern
                    .attr(
                        "fill",
                        "none"
                    );
            }
        );
    }, [data, width, height]);

    return (
        <div className="federal-election-turnout">
            <div className="federal-election-turnout-text">
                <div className="federal-election-turnout-title">
                    Federal Election
                    Turnout (1867-2021)
                </div>
                <div className="federal-election-turnout-summary">
                    Average Voter
                    Turnout: {avg}%
                    Lowest Voter
                    Turnout: {min}%
                    Highest Voter
                    Turnout: {max}%
                </div>
            </div>
            <svg
                className="federal-election-turnout-radial"
                ref={svgRef}
                width={width}
                height={height}
            />
        </div>
    );
};

export default FederalElectionTurnout;
