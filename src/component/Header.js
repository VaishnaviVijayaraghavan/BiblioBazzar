import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../slices/userSlice";
import "./style.css";
import { GiBookshelf } from "react-icons/gi";

function Header() {
  let { isuserlogin, obj } = useSelector((state) => state.users);

  let dispatch = useDispatch();

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        className="navbar-dark navbar-custom"
      >
        <Container>
          <Navbar.Brand href="/">
            <b>
              Biblio <GiBookshelf /> bazaar
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ms-5">
              <LinkContainer to="/">
                <Nav.Link className="nav-link">Home</Nav.Link>
              </LinkContainer>

              {!isuserlogin && (
                <LinkContainer to="/signup">
                  <Nav.Link className="nav-link">Signup</Nav.Link>
                </LinkContainer>
              )}

              {isuserlogin && (
                <LinkContainer to="/favourite">
                  <Nav.Link className="nav-link">Favourites</Nav.Link>
                </LinkContainer>
              )}

              {isuserlogin && (
                <LinkContainer to="/recommended">
                  <Nav.Link className="nav-link">Recommended Books</Nav.Link>
                </LinkContainer>
              )}

              {isuserlogin ? (
                <NavDropdown
                  title={obj.name}
                  id="collasible-nav-dropdown"
                  className="px-4"
                >
                  <LinkContainer to="/viewprofile">
                    <NavDropdown.Item>View Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={() => dispatch(userlogout())}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link">Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
