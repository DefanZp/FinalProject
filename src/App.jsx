import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./store/middleware/ProtectedRoute";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Favorite from "./pages/Favorite/Favorite";
import WatchList from "./pages/WatchList/WatchList";
import CastDetail from "./pages/CastDetail/CastDetail";
import ScrollUp from "./store/ScrollUp/ScrollUp";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    
    <Provider store={store}>
      <Toaster position="top-right" />
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={
              <ScrollUp>
              <Detail />
              </ScrollUp>
            } />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cast/:id" element={
              <ScrollUp>
              <CastDetail />
              </ScrollUp>
              } />
            <Route
              path="/favorite"
              element={
                <ProtectedRoute>
                  <Favorite />
                </ProtectedRoute>
              }
            />

            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <WatchList />
                </ProtectedRoute>
              }
            />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
