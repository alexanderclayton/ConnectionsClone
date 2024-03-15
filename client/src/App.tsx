import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Game, Home, Signin } from "./pages";
import { AuthProvider, ProtectedRoute } from "./context";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
