import React, {
    useEffect,
    useRef,
} from "react";
import "./FederalElectionTurnout.css";
import * as d3 from "d3";

const FederalElectionTurnout = () => {
    const svgRef = useRef();

    const width = 600;
    const height = 600;

    const data = [
        { year: 1970, turnout: 65.2 },
        { year: 1974, turnout: 59.8 },
        { year: 1978, turnout: 62.3 },
        { year: 1982, turnout: 68.5 },
        { year: 1986, turnout: 70.1 },
        { year: 1990, turnout: 66.8 },
        { year: 1994, turnout: 72.3 },
        { year: 1998, turnout: 69.4 },
        { year: 2002, turnout: 64.7 },
        { year: 2006, turnout: 61.3 },
        { year: 2010, turnout: 58.9 },
        { year: 2014, turnout: 63.2 },
        { year: 2018, turnout: 65.7 },
    ];

    useEffect(() => {
        const svg = d3.select(
            svgRef.current
        );
        svg.selectAll("*").remove(); // Clear before redraw

        const radius =
            Math.min(width, height) /
                2 -
            50;
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
            .domain([0, 50, 100]) // full range: 0–100%
            .range([
                0,
                radius * 0.2,
                radius,
            ]); // 0–50% compressed, 50–100% proportional

        const total = data.length;
        const angleStep = 360 / total; // degrees per bar
        const startDeg = angleStep / 2; // desired starting angle in degrees

        // Convert degrees to radians and rotate so 0° is straight up
        const angle = (deg) =>
            (deg - 90) *
            (Math.PI / 180);

        // Draw bars
        data.forEach((d, i) => {
            const baseline = 50; // start showing bars from 50%
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
                    "steelblue"
                )
                .attr(
                    "stroke-width",
                    3
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
        [50, 60, 70, 80].forEach(
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

                // refGroup
                //     .append("text")
                //     .attr("y", -r)
                //     .attr(
                //         "text-anchor",
                //         "middle"
                //     )
                //     .attr(
                //         "dy",
                //         "-0.4em"
                //     )
                //     .attr(
                //         "font-size",
                //         "10px"
                //     )
                //     .text(`${t}%`);
            }
        );
    }, [data, width, height]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
        />
    );
};

export default FederalElectionTurnout;
