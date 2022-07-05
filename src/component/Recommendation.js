import { useCart } from "react-use-cart";
import { useState } from "react";
import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Displaydetails from "./Displaydetails";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import Footer from "./footer";

function RecommendationList() {
  const { items, isEmpty, removeItem } = useCart();
  let navigate = useNavigate();
  let { obj } = useSelector((state) => state.users);
  let [Obj, setObj] = useState();
  let [show, setshow] = useState(false);

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

  const display = (Obj) => {
    setshow(true);

    setObj(Obj);
    console.log(Obj);
  };

  if (isEmpty) return <h2 className="mouse">No recommendations yet!</h2>;
  return (
    <>
      <div className="container">
        <br />
        <p className="display-2 text-center">All Recommendations</p>
        <br />
        <div className="Container">
          <Row xs={1} sm={2} md={4}>
            {items.map((obj, index) => (
              <Col>
                <Card style={{ width: "16rem" }} className="mt-3 card bg-light">
                  <Card.Img
                    variant="top"
                    src={obj.cover}
                    width="110px"
                    height="250px"
                  />
                  <Card.Body>
                    <Card.Title className="text-center h2 text-success">
                      {obj.title}
                    </Card.Title>
                    <Card.Text>
                      <h6>Author: {obj.author}</h6>
                      <h6>Genre: {obj.genre}</h6>
                      <h6>Year: {obj.year}</h6>
                    </Card.Text>
                    <div class="d-flex justify-content-between">
                      <Button variant="warning" onClick={() => display(obj)}>
                        {" "}
                        <BsInfoCircle />
                        {"  "} Read More{" "}
                      </Button>
                      <Button
                        variant="success"
                        className="ms-auto"
                        onClick={() => favouritebook(obj)}
                      >
                        <BsFillStarFill />
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
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default RecommendationList;
