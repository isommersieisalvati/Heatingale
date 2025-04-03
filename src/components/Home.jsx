import React, {
    useEffect,
} from "react";

const Home = () => {
    useEffect(() => {
        document.title =
            "Home Page | Heatingale";
    }, []);

    return (
        <div>
            <h2>
                Data Visualization
                corner
            </h2>
            <div className="canada">
                <p>
                    View Canadian
                    election results
                    dynamically.
                </p>
            </div>
            <div className="fandom">
                <p>
                    ...Or coming for
                    fandom trends? (My
                    true passion.)
                </p>
            </div>
        </div>
    );
};

export default Home;
