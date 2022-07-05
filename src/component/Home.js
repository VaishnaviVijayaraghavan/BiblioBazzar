import axios from "axios";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Spinner,
  Modal,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Displaydetails from "./Displaydetails";
import { Search } from "react-bootstrap-icons";
import { useCart } from "react-use-cart";
import "./style.css";
import { GiBookshelf } from "react-icons/gi";
import { FiFilter } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import Footer from "./footer";

function Home() {
  let [books, setbooks] = useState([]);
  let [filterdata, setfilterdata] = useState([]);
  let [Obj, setObj] = useState();
  let [show, setshow] = useState(false);
  let navigate = useNavigate();
  let { obj } = useSelector((state) => state.users);

  const [searchField, setSearchField] = useState("");

  useEffect(async () => {
    let res = await axios.get("https://jsonblob.com/api/993391939969892352");
    let data = res.data.books;
    setbooks(data);
    setfilterdata(data);
  }, []);
  const { addItem } = useCart();

  const display = (Obj) => {
    setshow(true);

    setObj(Obj);
    console.log(Obj);
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const searching = () => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchField.toLowerCase()) ||
        book.author.toLowerCase().includes(searchField.toLowerCase())
    );

    setfilterdata(filtered);
  };

  const filterFantacy = () => {
    let filtered = books.filter((v) => v.genre == "Fantasy");

    setfilterdata(filtered);
  };

  const filterCrimenovel = () => {
    let filtered = books.filter((v) => v.genre == "Crime novel");

    setfilterdata(filtered);
  };

  const filtetThriller = () => {
    let filtered = books.filter((v) => v.genre == "Thriller");

    setfilterdata(filtered);
  };

  const filterHorror = () => {
    let filtered = books.filter((v) => v.genre == "Horror");

    setfilterdata(filtered);
  };

  const nofilter = () => {
    setfilterdata(books);
  };

  const favouritebook = async (favouriteobj) => {
    if (obj != null) {
      let favourite = { name: obj.name, favourites: [{ ...favouriteobj }] };
      let response = await axios.post(
        "http://localhost:5000/user/favourite",
        favourite
      );
    } else {
      alert("Login is required");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container">
        <br />
        <h3 className="text-center welcome">
          Welcome to the shelf of Biblio
          <GiBookshelf />
          bazaar
        </h3>
        <br />
        <div className="container-fluid">
          <div className="row">
            <Col></Col>
            <Col>
              <InputGroup className=" searchfield justify-content-center my-3">
                <FormControl
                  id="inlineFormInputGroupUsername"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <Button
                  variant="warning"
                  id="button-addon2"
                  onClick={() => searching()}
                >
                  <Search />
                </Button>
              </InputGroup>
            </Col>
            <Col className="px-0">
              <div className="dropdown d-block">
                <button
                  className="btn btn-warning dropdown-toggle mt-3 mb-3"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiFilter />
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li className="dropdown-item" onClick={() => nofilter()}>
                    No Filter
                  </li>

                  <li className="dropdown-item" onClick={() => filterFantacy()}>
                    Fantasy
                  </li>

                  <li
                    className="dropdown-item"
                    onClick={() => filterCrimenovel()}
                  >
                    Crime novel
                  </li>

                  <li
                    className="dropdown-item"
                    onClick={() => filtetThriller()}
                  >
                    Thriller
                  </li>

                  <li className="dropdown-item" onClick={() => filterHorror()}>
                    Horror
                  </li>
                </ul>
              </div>
            </Col>
          </div>
        </div>
        <div>
          <Container>
            <Row xs={1} sm={2} md={4}>
              {filterdata.length == 0 && (
                <h2 className="mouse">No books found!</h2>
              )}

              {filterdata.length != 0 &&
                filterdata.map((obj, index) => (
                  <Col>
                    <Card
                      style={{ width: "16rem" }}
                      className="mt-3 card bg-light"
                    >
                      <Card.Img
                        variant="top"
                        src={obj.cover}
                        width="110px"
                        height="250px"
                      />
                      <Card.Body>
                        <Card.Title className="text-center text-success h2">
                          {obj.title}
                        </Card.Title>
                        <Card.Text>
                          <h6>Author: {obj.author}</h6>
                          <h6>Genre: {obj.genre}</h6>
                          <h6>Year: {obj.year}</h6>
                        </Card.Text>
                        <div class="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            onClick={() => display(obj)}
                          >
                            {" "}
                            <BsInfoCircle />
                            {"  "} Read More{" "}
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => favouritebook(obj)}
                          >
                            <BsFillStarFill />
                          </Button>
                        </div>
                        <div className="d-grid gap-2 my-2">
                          <Button
                            variant="info"
                            onClick={() => {
                              addItem(obj);
                            }}
                          >
                            Recommend
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
            <Modal show={show} fullscreen onHide={() => setshow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Book Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Displaydetails Obj={Obj} />
              </Modal.Body>
            </Modal>
          </Container>
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
