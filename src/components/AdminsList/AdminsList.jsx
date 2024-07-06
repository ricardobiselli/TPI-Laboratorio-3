import { useState, useEffect } from "react";
import { getAdmins, addAdmin, updateAdmin, deleteAdmin } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";

const initialAdminState = {
  userName: "",
  email: "",
  password: "",
};

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(initialAdminState);
  const [modalMode, setModalMode] = useState("add");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data.$values || []);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  const handleOpenModal = (mode, admin = null) => {
    setModalMode(mode);
    setCurrentAdmin(admin || initialAdminState);
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!currentAdmin.userName || !currentAdmin.email || !currentAdmin.password) {
        setError("Por favor completa todos los campos.");
        return;
      }

      if (!isValidEmail(currentAdmin.email)) {
        setError("Por favor ingresa un correo electrónico válido.");
        return;
      }

      if (modalMode === "add") {
        await addAdmin(currentAdmin);
      } else {
        await updateAdmin(currentAdmin.id, currentAdmin);
      }
      await fetchAdmins();
      handleCloseModal();
    } catch (error) {
      console.error(`Error ${modalMode === "add" ? "adding" : "updating"} admin:`, error);
      setError(`Error ${modalMode === "add" ? "agregando" : "actualizando"} admin.`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar a este administrador?")) {
      try {
        await deleteAdmin(id);
        await fetchAdmins();
      } catch (error) {
        console.error(`Error deleting admin with ID ${id}:`, error);
      }
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Administrar Admins</h1>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal("add")}>
        Agregar Admin
      </Button>

      {admins.map((admin) => (
        <div key={admin.id} className="border rounded p-3 mb-3">
          <Row>
            <Col>
              <div><strong>Username:</strong> {admin.userName}</div>
              <div><strong>Email:</strong> {admin.email}</div>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-primary"
                onClick={() => handleOpenModal("edit", admin)}
                className="mb-2 d-block w-100"
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(admin.id)}
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
          <Modal.Title>{modalMode === "add" ? "Agregar Admin" : "Editar Admin"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={currentAdmin.userName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentAdmin.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentAdmin.password}
                onChange={handleChange}
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

export default Admins;
