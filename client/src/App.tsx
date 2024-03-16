import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateAccount, Game, Home, Postgame, Signin } from "./pages";
import { AuthProvider, ProtectedRoute } from "./context";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/game" element={<Game />} />
              <Route path="/postgame" element={<Postgame />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
