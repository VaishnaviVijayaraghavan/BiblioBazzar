import { useSelector } from "react-redux";
import { Row, Col, Button, Card, Container, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Displaydetails from "./Displaydetails";
import Footer from "./footer";
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";

function Favourite() {
  let navigate = useNavigate();

  let { obj } = useSelector((state) => state.users);
  let [favouritebook, setfavouritebook] = useState([]);
  let [Obj, setObj] = useState();
  let [show, setshow] = useState(false);

  useEffect(async () => {
    let response = await axios.get(
      `http://localhost:5000/user/favourite/${obj.name}`
    );
    let data = response.data;
    if (data.message == "favourite books") {
      setfavouritebook(data.payload.favourites);
    }
  }, []);

  console.log(favouritebook);

  const display = (Obj) => {
    setshow(true);

    setObj(Obj);
    console.log(Obj);
  };

  return (
    <>
      <div>
        <Container>
          <br />
          <p className="display-2 text-center">
            Greetings, {obj.name}! Here are your favourites
          </p>
          <br />
          <br />
          <Row xs={1} sm={2} md={4}>
            {favouritebook.length == 0 && (
              <h2 className="mt-5 text-danger text-center">
                No books in favourite list
              </h2>
            )}
            {favouritebook.length != 0 &&
              favouritebook.map((obj, index) => (
                <Col>
                  <Card
                    style={{ width: "16rem" }}
                    className="mt-3 m-3 card bg-light"
                  >
                    <Card.Img
                      variant="top"
                      src={obj.cover}
                      width="110px"
                      height="250px"
                    />
                    <Card.Body>
                      <Card.Title className="text-center h3 text-success">
                        {obj.title}
                      </Card.Title>
                      <br />
                      <Card.Text>
                        <h6>Author: {obj.author}</h6>
                        <h6>Genre: {obj.genre}</h6>
                        <h6>Year: {obj.year}</h6>
                      </Card.Text>
                      <div className="d-grid gap-2 my-2">
                        <Button variant="warning" onClick={() => display(obj)}>
                          <BsInfoCircle /> Read More{" "}
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
      <Footer />
    </>
  );
}

export default Favourite;
