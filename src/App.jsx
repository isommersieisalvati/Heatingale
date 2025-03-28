import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import CanadianElection from "./components/CanadianElection";
import Fandom from "./components/Fandom";

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/fandom"
                        element={
                            <Fandom />
                        }
                    />
                    <Route
                        path="/canadian_politics"
                        element={
                            <CanadianElection />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
