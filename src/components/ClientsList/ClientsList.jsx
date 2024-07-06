import { useState, useEffect } from "react";
import { getClients, addClient, updateClient, deleteClient } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";

const initialClientState = {
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  dniNumber: "",
  address: "",
  password: ""
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(initialClientState);
  const [modalMode, setModalMode] = useState("add");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(Array.isArray(data) ? data : data.$values || []);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const handleOpenModal = (mode, client = null) => {
    setModalMode(mode);
    setCurrentClient(client || initialClientState);
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { userName, email, firstName, lastName, dniNumber, address, password } = currentClient;
    if (!userName || !email || !firstName || !lastName || !dniNumber || !address || !password) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (isNaN(Number(dniNumber)) || dniNumber.length > 8) {
      setError("DNI debe ser un número de hasta 8 dígitos.");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Email inválido.");
      return false;
    }
    if (Number(dniNumber) < 0) {
      setError("DNI no puede ser negativo.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      if (modalMode === "add") {
        await addClient(currentClient);
      } else {
        await updateClient(currentClient.id, currentClient);
      }
      await fetchClients();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving client:", error);
      setError("Error saving client. Please check your input and try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        await fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Administrador de Clientes</h1>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal("add")}>
        Agregar Cliente
      </Button>

      {clients.map((client) => (
        <div key={client.id} className="border rounded p-3 mb-3">
          <Row>
            <Col>
              <div><strong>Username:</strong> {client.userName}</div>
              <div><strong>Nombre:</strong> {client.firstName}</div>
              <div><strong>Apellido:</strong> {client.lastName}</div>
              <div><strong>Email:</strong> {client.email}</div>
              <div><strong>DNI:</strong> {client.dniNumber}</div>
              <div><strong>Domicilio:</strong> {client.address}</div>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-primary"
                onClick={() => handleOpenModal("edit", client)}
                className="mb-2 d-block w-100"
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(client.id)}
                className="mb-2 d-block w-100"
              >
                Borrar
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Agregar Cliente" : "Editar Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={currentClient.userName}
                onChange={handleChange}
                isInvalid={error && !currentClient.userName}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentClient.email}
                onChange={handleChange}
                isInvalid={error && !currentClient.email}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={currentClient.firstName}
                onChange={handleChange}
                isInvalid={error && !currentClient.firstName}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={currentClient.lastName}
                onChange={handleChange}
                isInvalid={error && !currentClient.lastName}
              />
            </Form.Group>
            <Form.Group controlId="formDniNumber">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dniNumber"
                value={currentClient.dniNumber}
                onChange={handleChange}
                isInvalid={error && (!currentClient.dniNumber || isNaN(Number(currentClient.dniNumber)) || currentClient.dniNumber.length > 8)}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentClient.address}
                onChange={handleChange}
                isInvalid={error && !currentClient.address}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentClient.password}
                onChange={handleChange}
                isInvalid={error && !currentClient.password}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clients;
