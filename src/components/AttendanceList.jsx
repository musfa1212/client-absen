import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const apiUrl = "http://localhost:4000";

function AttendanceList() {
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [attandances, setAttandances] = useState([]);
  const [isUpdate, setIsUpdate] = useState(0);
  const [attandanceId, setAttandanceId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: name,
      address: address,
      email: email,
      phone: phone,
    };

    function createAttandance() {
      axios
        .post(`${apiUrl}/create`, payload, { headers: { token } })
        .then(({ data: { data } }) => {
          setAttandances([...attandances, data]);
          setShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    createAttandance();

    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
  }

  function updateAttandance(number, person) {
    setIsUpdate(number);
    setAttandanceId(person._id);
    setUpdateName(person.name);
    setUpdateAddress(person.address);
    setUpdateEmail(person.email);
    setUpdatePhone(person.phone);
  }

  function cancelUpdateAttandance() {
    setIsUpdate(0);
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();

    const payload = {
      name: updateName,
      address: updateAddress,
      email: updateEmail,
      phone: updatePhone,
    };

    function submitUpdateAttandance() {
      axios
        .patch(`${apiUrl}/update/${attandanceId}`, payload, {
          headers: { token },
        })
        .then((data) => {
          const newAttandances = attandances.map((attandance) => {
            if (attandance._id === attandanceId) {
              attandance.name = updateName;
              attandance.address = updateAddress;
              attandance.email = updateEmail;
              attandance.phone = updatePhone;
            }

            return attandance;
          });

          setAttandances(newAttandances);
          setIsUpdate(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    submitUpdateAttandance();

    setAttandanceId("");
    setUpdateName("");
    setUpdateAddress("");
    setUpdateEmail("");
    setUpdatePhone("");
  }

  function deleteAttandance(id) {
    axios
      .delete(`${apiUrl}/delete/${id}`, { headers: { token } })
      .then((data) => {
        const deleteAttandaceById = attandances.filter(
          (attandance) => attandance._id !== id
        );

        setAttandances(deleteAttandaceById);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    function getData() {
      axios
        .get(`${apiUrl}`, { headers: { token } })
        .then(({ data: { data } }) => {
          setAttandances(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  }

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          height: "64px",
          background: "white",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <h1 className="text-center" style={{ fontSize: "28px" }}>
          Daftar Kehadiran Peserta Rapat
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setShow(true)}
            style={{
              background: "green",
              color: "white",
              borderColor: "green",
            }}
          >
            Add
          </Button>
          <Button
            onClick={logout}
            style={{
              background: "red",
              color: "white",
              borderColor: "red",
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "84px" }} />
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Tambah Peserta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input type="submit" />
          </form>
        </Modal.Body>
      </Modal>
      <div className="m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {attandances.map((person, index) => (
              <tr key={index}>
                {isUpdate === index + 1 ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={updateName}
                        placeholder="Name"
                        onChange={(e) => setUpdateName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="address"
                        value={updateAddress}
                        placeholder="Address"
                        onChange={(e) => setUpdateAddress(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="email"
                        value={updateEmail}
                        placeholder="Email"
                        onChange={(e) => setUpdateEmail(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="phone"
                        value={updatePhone}
                        placeholder="Phone"
                        onChange={(e) => setUpdatePhone(e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        style={{
                          background: "green",
                          color: "white",
                          borderColor: "green",
                        }}
                        onClick={handleSubmitUpdate}
                      >
                        update
                      </Button>
                      &nbsp;
                      <Button
                        style={{
                          background: "red",
                          color: "white",
                          borderColor: "red",
                        }}
                        onClick={cancelUpdateAttandance}
                      >
                        cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{person.name}</td>
                    <td>{person.address}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>
                      <Button
                        style={{
                          background: "green",
                          color: "white",
                          borderColor: "green",
                        }}
                        onClick={() => updateAttandance(index + 1, person)}
                      >
                        edit
                      </Button>
                      &nbsp;
                      <Button
                        style={{
                          background: "red",
                          color: "white",
                          borderColor: "red",
                        }}
                        onClick={() => deleteAttandance(person._id)}
                      >
                        delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AttendanceList;
