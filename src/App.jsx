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
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CanadianElection />
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
                <Footer />
            </div>
        </Router>
    );
};

export default App;
