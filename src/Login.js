import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import * as yup from "yup";
import "./index.css";

const button = {
  background: "#FF5A5F",
  color: "white",
};

const input = {
  marginTop: "0",
  height: "25px"
}

const DividerExampleVerticalForm = (props) => {
  const [users, setUsers] = useState({ username: "", password: "" });

  const [errors, setErrors] = useState({ username: "", password: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
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

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/auth/login", users)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.users_id);
        props.history.push(`/dashboard/${res.data.users_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const routeSignup = () => {
    props.history.push("/signup");
  };

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form onSubmit={login}>
            <Form.Input
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={users.username}
            />
            {errors.username.length > 0 ? (
              <div style={input} class="ui pointing red basic label">{errors.username}</div>
            ) : <div style={input}> </div>}
            <Form.Input
              icon="lock"
              iconPosition="left"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={users.password}
            />
            {errors.password.length > 0 ? (
              <div style={input} class="ui pointing red basic label">{errors.password}</div>
            ) : <div style={input}> </div>}
            <Button disabled={buttonDisabled} content="Login" style={button} />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Button
            content="Sign up"
            icon="signup"
            size="big"
            onClick={routeSignup}
          />
        </Grid.Column>
      </Grid>

      <Divider vertical className="divider">
        Or
      </Divider>
    </Segment>
  );
};

export default DividerExampleVerticalForm;
