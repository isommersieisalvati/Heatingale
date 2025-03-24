import { Router } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CanadianElection from "./components/CanadianElection";
import Fandom from "./components/Fandom";
const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />
                    <Route
                        path="/fandom"
                        component={
                            Fandom
                        }
                    />
                    <Route
                        path="/canadian_politics"
                        component={
                            CanadianElection
                        }
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
