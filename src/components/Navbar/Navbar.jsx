
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "../../store/Menu/MenuSlice";
import { clearAuthentication } from "../../store/Login/LoginSlice";
import NavbarView from "./NavbarView";

const Navbar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen); 
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)
  const username = useSelector((state) => state.login.TmdbUsername);
  const [isScrolled, setisScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 120) {
      setisScrolled(true);
    } else {
      setisScrolled(false);
    }
  }


 
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
        isScrolled={isScrolled}
      />
    </div>
  );
};

export default Navbar;