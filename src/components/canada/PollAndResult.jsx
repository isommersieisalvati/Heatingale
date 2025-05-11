import React, { useRef, useEffect } from "react";
import "./PollAndResult.css";
import * as d3 from "d3";

const PollAndResult = () => {
  const data = [
    { year: 2011, predicted: 37.1, actual: 39.6, winner: "Conservative" },
    { year: 2015, predicted: 39.1, actual: 39.5, winner: "Liberal" },
    { year: 2019, predicted: 32.5, actual: 34.3, winner: "Conservative" },
    { year: 2021, predicted: 31.2, actual: 33.7, winner: "Conservative" },
    { year: 2025, predicted: 42.6, actual: 43.7, winner: "Liberal" },
  ];

  const width = 700;
  const height = 300;

  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove(); // Clear previous renders

    const margin = { top: 50, right: 100, bottom: 60, left: 60 };
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const years = data.map((d) => d.year);
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => Math.min(d.predicted, d.actual)) - 5,
        d3.max(data, (d) => Math.max(d.predicted, d.actual)) + 5,
      ])
      .range([0, innerWidth]);

    const y = d3
      .scalePoint()
      .domain(years)
      .range([0, innerHeight])
      .padding(0.5);

    // Axes
    g.append("g").call(d3.axisLeft(y));
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(2)
          .tickFormat((d) => d + "%")
      );

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "2,2");

    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(-innerHeight).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "2,2");

    // Improve axes styles
    g.selectAll(".domain").remove();
    g.selectAll(".tick line").attr("stroke", "#ccc");
    g.selectAll(".tick text").attr("font-size", "12px");

    // Lines (dumbbell)
    g.selectAll(".line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", (d) => x(d.predicted))
      .attr("x2", (d) => x(d.actual))
      .attr("y1", (d) => y(d.year))
      .attr("y2", (d) => y(d.year))
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    // Predicted dot
    g.selectAll(".dot1")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.predicted))
      .attr("cy", (d) => y(d.year))
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    // Actual dot
    g.selectAll(".dot2")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.actual))
      .attr("cy", (d) => y(d.year))
      .attr("r", 5)
      .attr("fill", "#404080");

    // Labels
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.predicted) - 5)
      .attr("y", (d) => y(d.year) - 10)
      .text((d) => `${d.predicted}%`)
      .attr("text-anchor", "end")
      .attr("font-size", "10px");

    g.selectAll(".label2")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.actual) + 5)
      .attr("y", (d) => y(d.year) - 10)
      .text((d) => `${d.actual}%`)
      .attr("font-size", "10px");

    // Add legend as the right x axis
    g.selectAll(".winner-label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", innerWidth + 10)
      .attr("y", (d) => y(d.year))
      .text((d) => d.winner)
      .attr("font-size", "12px")
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle");

    // Add "Year" label above Y axis
    svg
      .append("text")
      .attr("x", margin.left - 40)
      .attr("y", margin.top - 10)
      .text("Year")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    // Add "Winner" label above actual winner right axis
    svg
      .append("text")
      .attr("x", width - margin.right)
      .attr("y", margin.top - 10)
      .text("Winner")
      .attr("text-anchor", "start")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    // Add "Percentage" label below x-axis
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", innerHeight + 70)
      .text("Percentage")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    // Predicted (green)
    svg
      .append("circle")
      .attr("cx", 6)
      .attr("cy", 10)
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    svg
      .append("text")
      .attr("x", 14)
      .attr("y", 14)
      .text("Predicted Vote")
      .attr("font-size", "12px")
      .attr("fill", "#000");

    // Actual (blue)
    svg
      .append("circle")
      .attr("cx", 150)
      .attr("cy", 10)
      .attr("r", 5)
      .attr("fill", "#404080");

    svg
      .append("text")
      .attr("x", 160)
      .attr("y", 14)
      .text("Actual Vote")
      .attr("font-size", "12px")
      .attr("fill", "#000");
  }, [width, height]);

  return (
    <div className="poll-and-result">
      <div className="poll-and-result-title">
        Winner Vote Percentage (Actual & Poll)
      </div>
      <div className="poll-and-result-subtitle">
        * The poll data comes from Nano Research.
      </div>
      <svg className="poll-and-result-graph" ref={ref}></svg>
    </div>
  );
};

export default PollAndResult;
