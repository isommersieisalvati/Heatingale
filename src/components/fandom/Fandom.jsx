import React, {
    useEffect,
} from "react";
import RaceBarChart from "./RaceBarChart";
import "./Fandom.css";

const Fandom = () => {
    useEffect(() => {
        document.title =
            "Fandom | Heatingale";
    }, []);
    return (
        <div className="fandom">
            <RaceBarChart />
        </div>
    );
};

export default Fandom;
