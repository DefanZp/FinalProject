
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "../../store/Menu/MenuSlice";
import { clearAuthentication } from "../../store/Login/LoginSlice";
import NavbarView from "./NavbarView";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen); 
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)
  const username = useSelector((state) => state.login.TmdbUsername);
  const navigate = useNavigate();

 
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

 
  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  const handleLogout = () => {
    dispatch(clearAuthentication());
  };

  return (
    <div>

      <NavbarView
        isMenuOpen={isMenuOpen}
        handleToggleMenu={handleToggleMenu}
        handleCloseMenu={handleCloseMenu}
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        username={username}
      />
    </div>
  );
};

export default Navbar;