import { useState, useEffect } from "react";
import { getClients, addClient, updateClient, deleteClient, getClientOrders } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [clientOrders, setClientOrders] = useState({});
  const [currentClient, setCurrentClient] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    dniNumber: "",
    address: "",
    password: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    clients.forEach(client => fetchClientOrders(client.id));
  }, [clients]);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      const clientsArray = Array.isArray(data) ? data : data.$values || [];
      setClients(clientsArray);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const fetchClientOrders = async (clientId) => {
    try {
      const orders = await getClientOrders(clientId);
      setClientOrders(prevOrders => ({
        ...prevOrders,
        [clientId]: Array.isArray(orders) ? orders : orders.$values || []
      }));
    } catch (error) {
      console.error("Failed to fetch client orders:", error);
    }
  };

  const handleOpenModal = (mode, client = null) => {
    setModalMode(mode);
    setCurrentClient(client || {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      dniNumber: "",
      address: "",
      password: ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleSaveClient = async () => {
    try {
      console.log("Saving client with data:", currentClient);
      if (modalMode === "add") {
        await addClient(currentClient);
      } else {
        await updateClient(currentClient.id, currentClient);
      }
      await fetchClients();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving client:", error);
      setError("Error saving client. Please check your input and try again.");
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        await fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  const handleChangeClient = (e) => {
    const { name, value } = e.target;
    setCurrentClient(prevData => ({ ...prevData, [name]: value }));
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
              <div><strong>DNI :</strong> {client.dniNumber}</div>
              <div><strong>Domicilio:</strong> {client.address}</div>
              <div className="mt-3">
                <strong>Ordenes de compra:</strong>
                {clientOrders[client.id] ? (
                  <ul>
                    {clientOrders[client.id].map(order => (
                      <li key={order.orderId}>
                        Orden Id nro: {order.orderId}, Total: ${order.totalAmount}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
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
                onClick={() => handleDeleteClient(client.id)}
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
          <Modal.Title>{modalMode === "add" ? "Add Client" : "Edit Client"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formClientUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={currentClient.userName}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={currentClient.firstName}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientLastName">
              <Form.Label> Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={currentClient.lastName}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentClient.email}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientDniNumber">
              <Form.Label>DNI </Form.Label>
              <Form.Control
                type="text"
                name="dniNumber"
                value={currentClient.dniNumber}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientAddress">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentClient.address}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentClient.password}
                onChange={handleChangeClient}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveClient}>
            {modalMode === "add" ? "Agregar Cliente" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clients;
