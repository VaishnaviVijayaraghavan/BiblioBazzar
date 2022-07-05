import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Footer from "./footer";
import "./style.css";

function Signup() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [err, setErr] = useState({ status: false, errmsg: "" });

  const onformsubmit = async (userobj) => {
    console.log(userobj);
    let res = await axios.post(
      "http://localhost:5000/user/createuser",
      userobj
    );
    let resobj = res.data;
    let message = resobj.message;
    if (message == "user created") {
      navigate("/login");
    } else {
      //alert(resobj.message);
      setErr({ ...err, status: true, errmsg: message });
    }
  };
  return (
    <>
      <div className="container ">
        <Form
          className="w-50 mx-auto mt-4"
          onSubmit={handleSubmit(onformsubmit)}
        >
          <p className="display-2 text-center">Signup here</p>
          <br />
          {err.status == true && (
            <p className="text-danger text-center h3">{err.errmsg}</p>
          )}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              {...register("name", { required: true, minLength: 5 })}
            />
            {errors.name?.type == "required" && (
              <p className="text-danger">*Username is required</p>
            )}
            {errors.name?.type == "minLength" && (
              <p className="text-danger">
                *Minimium 5 letters should be entered
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email", { required: true })}
            />
            {errors.email?.type == "required" && (
              <p className="text-danger">*email is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type == "required" && (
              <p className="text-danger">*Password is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneno">
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="number"
              {...register("phoneno", { required: true })}
            />
            {errors.phoneno?.type == "required" && (
              <p className="text-danger">*Phone number is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" {...register("location")} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="I agree to Bibliobazzar's Terms of Service, Privacy Policy and Content Policies"
              className="text-success"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="d-block mx-auto">
            Create Account
          </Button>
          <div className="mt-3 text-center">
            Already have a Account?
            <span
              className="text-success ms-2 login"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </Form>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Signup;
