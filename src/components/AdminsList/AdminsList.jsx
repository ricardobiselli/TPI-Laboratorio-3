import { useState, useEffect } from "react";
import { getAdmins, addAdmin, updateAdmin, deleteAdmin } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [updatedAdminData, setUpdatedAdminData] = useState({
    userName: "",
    email: "",
    password: ""
  });

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
    if (mode === "edit" && admin) {
      setSelectedAdmin(admin);
      setUpdatedAdminData({
        userName: admin.userName,
        email: admin.email,
        password: ""  
      });
    } else {
      setSelectedAdmin(null);
      setUpdatedAdminData({
        userName: "",
        email: "",
        password: ""
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveAdmin = async () => {
    try {
      if (modalMode === "add") {
        await addAdmin(updatedAdminData);
      } else if (modalMode === "edit" && selectedAdmin) {
        await updateAdmin(selectedAdmin.id, updatedAdminData);
      }
      fetchAdmins();
      setShowModal(false);
    } catch (error) {
      console.error(`Error ${modalMode === "add" ? "adding" : "updating"} admin:`, error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id);
      fetchAdmins();
    } catch (error) {
      console.error(`Error deleting admin with ID ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdminData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Container>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal("add")}>
        Add Admin
      </Button>

      {admins.map((admin) => (
        <div key={admin.id} className="border rounded p-3 mb-3">
          <Row>
            <Col>
              <div><strong>Username:</strong> {admin.userName}</div>
              <div><strong>Email:</strong> {admin.email}</div>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="me-2" onClick={() => handleOpenModal("edit", admin)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteAdmin(admin.id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Add Admin" : "Edit Admin"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAdminUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={updatedAdminData.userName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAdminEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedAdminData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={updatedAdminData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAdmin}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admins;
