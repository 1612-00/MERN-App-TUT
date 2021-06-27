import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import learnItLogo from "../../assets/logo.svg";
import logoutLogo from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../contexts/AuthContext";

const NavBarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logout
  } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="fw-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="ms-2 me-2"
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-between"
      >
        <Nav>
          <Nav.Link className="fw-bolder text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="fw-bolder text-white mt-1" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="fw-bolder text-white me-2"
            onClick={logout}
          >
            <img
              src={logoutLogo}
              alt="logoutLogo"
              width="32"
              height="32"
              className="ms-2 me-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarMenu;
