import React, {
    useEffect,
} from "react";
import "./CanadianElection.css";
import "./FederalElectionResult";
import FederalElectionResult from "./FederalElectionResult";
import FederalElectionTurnout from "./FederalElectionTurnout";
import PollAndResult from "./PollAndResult";

const CanadianElection = () => {
    useEffect(() => {
        document.title =
            "Canadian Federal Election | Heatingale";
    }, []);

    return (
        <div className="election">
            <h2 className="election-title">
                2021 Canadian Federal
                Election
            </h2>
            <FederalElectionResult />
            <FederalElectionTurnout />
            <PollAndResult/>
        </div>
    );
};

export default CanadianElection;
