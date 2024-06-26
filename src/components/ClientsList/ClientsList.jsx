import { useState, useEffect, useContext } from "react";
import { getClients, addClient, updateClient, deleteClient } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form , Alert} from "react-bootstrap";
import AuthContext from '../../services/authentication/AuthContext';


const Clients = () => {
  const { user } = useContext(AuthContext);

  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [currentClient, setCurrentClient] = useState({
    id: null,
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    dniNumber: "",
    address: ""
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      const clientsArray = data.$values || [];
      setClients(clientsArray);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const handleOpenModal = (mode, client = null) => {
    setModalMode(mode);
    setCurrentClient(client || {
      id: null,
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      dniNumber: "",
      address: ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveClient = async () => {
    try {
      if (modalMode === "add") {
        await addClient(currentClient);
      } else {
        await updateClient(currentClient.id, currentClient);
      }
      await fetchClients();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        await fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleChangeClient = (e) => {
    const { name, value } = e.target;
    setCurrentClient(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  if (!user || user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] !== "superadmin") {
    return (
      <Container>
        <Alert variant="danger">
          Access denied. You must be a superadmin to view this page.
        </Alert>
      </Container>
    );
  }
  return (
    <Container>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal("add")}>
        Add Client
      </Button>

      {clients.map((client) => (
        <div key={client.id} className="border rounded p-3 mb-3">
          <Row>
            <Col>
              <div><strong>Username:</strong> {client.userName}</div>
              <div><strong>First Name:</strong> {client.firstName}</div>
              <div><strong>Last Name:</strong> {client.lastName}</div>
              <div><strong>Email:</strong> {client.email}</div>
              <div><strong>DNI Number:</strong> {client.dniNumber}</div>
              <div><strong>Address:</strong> {client.address}</div>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="me-2" onClick={() => handleOpenModal("edit", client)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteClient(client.id)}>
                Delete
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
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={currentClient.firstName}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientLastName">
              <Form.Label>Last Name</Form.Label>
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
              <Form.Label>DNI Number</Form.Label>
              <Form.Control
                type="text"
                name="dniNumber"
                value={currentClient.dniNumber}
                onChange={handleChangeClient}
              />
            </Form.Group>
            <Form.Group controlId="formClientAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentClient.address}
                onChange={handleChangeClient}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClient}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clients;