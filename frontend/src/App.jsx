/* Routing configuration */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Pets from "./pages/Pets";
import PetDetail from "./pages/PetDetail";
import FindPet from "./pages/FindPet";
import Breeds from "./pages/Breeds";


function App() {
    const { currentUser } = useAuth(); // Ensure authentication context works

    return (
        <Router>
            <div className="app-container">
                <Navbar /> {/* Navbar appears on all pages */}
                <div className="content"> 

                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />

                        {/* Protected Routes (Only for logged-in users) */}
                        {currentUser && (
                            <>
                                <Route path="/pets" element={<Pets />} />
                                <Route path="/pets/:id" element={<PetDetail />} />
                                <Route path="/search" element={<FindPet />} />
                                <Route path="/breeds" element={<Breeds />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/edit" element={<EditProfile />} />
                            </>
                        )}

                        {/* Redirect unknown paths to Home */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer /> 
            </div>
        </Router>
    );
}

export default App;
