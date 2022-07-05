import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Editprofile from "./Editprofile";
import Footer from "./footer";

function Viewprofile() {
  let { isuserlogin, obj } = useSelector((state) => state.users);
  let [modelshow, setmodelshow] = useState(false);
  let [editprofileobj, seteditprofileobj] = useState(null);
  let [profile, setprofile] = useState(obj);
  let token = localStorage.getItem("token");
  useEffect(async () => {
    let res = await axios.get(
      `http://localhost:5000/user/viewprofile/${obj.email}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    let data = res.data.payload;
    setprofile(data);
  }, []);

  //on edit is clicked
  const seteditobj = (profileobj) => {
    setmodelshow(true);
    seteditprofileobj({ ...editprofileobj, ...profileobj });
  };

  const afteredit = async (editedobj) => {
    setmodelshow(false);
    seteditprofileobj(null);
    editedobj.email = editprofileobj.email;
    let response = await axios.put(
      "http://localhost:5000/user/save-editedprofile",
      editedobj,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setprofile(response.data.payload);
  };

  return (
    <>
      <div className="container">
        <br />
        <p className="display-2 text-center">User Profile</p>
        <Card className="mt-5 w-50 mx-auto">
          <Card.Body className="text-center">
            <Card.Text>
              <h5>Customer ID: {profile._id}</h5>
              <h5>Name: {profile.name}</h5>
              <h5>Email: {profile.email}</h5>
              <h5>Phone No: {profile.phoneno} </h5>
              <h5>Location: {profile.location} </h5>
            </Card.Text>
            <br />
            <Button
              variant="primary"
              type="submit"
              onClick={() => seteditobj(profile)}
            >
              Edit Profile
            </Button>
          </Card.Body>
        </Card>
        {/* Edit modal */}
        {editprofileobj !== null && (
          <Editprofile
            show={modelshow}
            profileObj={editprofileobj}
            onHide={(editedprofileobj) => afteredit(editedprofileobj)}
          />
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Viewprofile;
