import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../slices/userSlice";
import { useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import { GiBookshelf } from "react-icons/gi";
import login from "../images/login.svg";

function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let { obj, iserror, errmsg, ispending, isuserlogin } = useSelector(
    (state) => state.users
  );

  let dispatch = useDispatch();

  useEffect(() => {
    if (isuserlogin == true) {
      navigate("/");
    }
  }, [obj]);

  const onformsubmit = async (userobj) => {
    dispatch(loginuser(userobj));
  };

  return (
    <>
      <div className="container">
        <br />
        <br />
        {iserror && (
          <p className="text-danger mt-3 display-5 text-center">{errmsg}</p>
        )}

        <p className="display-3 text-center">
          Log-In to experience the amazing features
        </p>
        <br />
        <br />
        <div className="container d-md-flex justify-content-md-evenly">
          <img src={login} width="350px" />
          <br />
          <Form
            className="w-50 mx-auto mt-4"
            onSubmit={handleSubmit(onformsubmit)}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register("password")} />
            </Form.Group>
            <Button variant="success" type="submit" className="d-block mx-auto">
              Login
            </Button>
          </Form>
        </div>
        <br />
        <br />
        <div className="mt-3 text-center h3">
          New to Biblio
          <GiBookshelf />
          bazzar?
          <span
            className="text-warning ms-2"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Login;
