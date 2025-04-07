import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen">
          <div className="background-container">
            <img
              src="/mine.jpg"
              alt="background"
              className="background-image"
            />
          </div>
          <div className="background-overlay" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <PrivateRoute>
                  <AddTask />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
