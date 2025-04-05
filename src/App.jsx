import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import CanadianElection from "./components/canada/CanadianElection";
import Fandom from "./components/fandom/Fandom";
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
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
                    element={<Fandom />}
                />
                <Route
                    path="/canadian_politics"
                    element={
                        <CanadianElection />
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
