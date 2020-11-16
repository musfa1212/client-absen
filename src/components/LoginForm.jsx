import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const apiUrl = "http://localhost:4000";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    axios
      .post(`${apiUrl}/login`, { email, password })
      .then(({ data: { data } }) => {
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          window.location.reload();
        } else {
          alert("Email or password wrong!");
        }
      })
      .catch(() => {
        alert("Email or password wrong!");
      });
  }

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        onSubmit={login}
        style={{
          width: "460px",
          border: "1px solid grey",
          padding: "16px",
          borderRadius: "6px",
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
