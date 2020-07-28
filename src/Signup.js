import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import * as yup from "yup";

const inputTop = {
  marginTop: "25px",
};
const button = {
  background: "#FF5A5F",
  color: "white",
};

const loggedIn = {
  color: "#0000EE",
  cursor: "pointer",
};

const input = {
  margin: "-1rem 0 1rem",
  textAlign: "left",
  color: "red",
  height: "20px",
};

const DividerExampleVerticalForm = (props) => {
  const [users, setUsers] = useState({ username: "", password: "" });

  const [errors, setErrors] = useState({ username: "", password: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().min(6, "At least 6 characters long.").required("Password is required."),
  });

  useEffect(() => {
    formSchema.isValid(users).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [users, formSchema]);

  const handleChange = (e) => {
    e.persist();

    yup
      .reach(formSchema, e.target.name)
      //we can then run validate using the value
      .validate(e.target.value)
      // if the validation is successful, we can clear the error message
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
              returned from yup (that we created in our schema) */
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/auth/register", users)
      .then((res) => {
        alert("You've registered successfully.");
        props.history.push("/");
      })
      .catch((err) => {
        alert(
          "There's been a problem with your registration, please check your details and try again."
        );
      });
  };

  const routeLogin = () => {
    props.history.push("/");
  };

  return (
    <Segment placeholder>
      <Grid columns={1} relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={register}>
            <Form.Input
              style={inputTop}
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={users.username}
            />
            {errors.username.length > 0 ? (
              <p style={input}>{errors.username}</p>
            ) : (
              <p style={input}></p>
            )}
            <Form.Input
              icon="lock"
              iconPosition="left"
              name="password"
              type="password"
              placeholder="Password   "
              onChange={handleChange}
              value={users.password}
            />
            {errors.password.length > 0 ? (
              <p style={input}>{errors.password}</p>
            ) : (
              <p style={input}></p>
            )}
            <Button
              disabled={buttonDisabled}
              content="Register"
              style={button}
            />
            <p>Already a user?</p>
            <p onClick={routeLogin} style={loggedIn}>
              <strong>Login</strong>
            </p>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default DividerExampleVerticalForm;
