import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Dashboard";
import Study from "./Study";
import Notes from "./Notes";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Páginas SEM header */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Páginas COM header */}
             <Route
             path="/dashboard"
             element={
            <ProtectedRoute>
            <>
            <Header />
            <Dashboard />
            </>
            </ProtectedRoute>
             }
           />

        <Route
          path="/study"
          element={
            <>
              <Header />
              <Study />
            </>
          }
        />

        <Route
          path="/notes"
          element={
            <>
              <Header />
              <Notes />
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;