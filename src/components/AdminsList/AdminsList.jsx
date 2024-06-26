import { useState, useEffect } from "react";
import { getAdmins, updateAdmin, deleteAdmin } from "../../api/ApiConnection";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [updatedAdminData, setUpdatedAdminData] = useState({
    userName: "",
    email: ""
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      console.log("data", data);
      setAdmins(data.$values || []);
    } catch (error) {
      console.error("fetch clients failed!!!", error);
    }
  };

  const handleViewDetails = (admin) => {
    setSelectedAdmin(admin); 
    setUpdatedAdminData({ 
      userName: admin.userName,
      email: admin.email
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleUpdateAdmin = async () => {
    try {
      const updatedData = {
        userName: updatedAdminData.userName,
        email: updatedAdminData.email
      };

      await updateAdmin(selectedAdmin.id, updatedData);
      fetchAdmins(); 
      setShowModal(false); 
    } catch (error) {
      console.error(`Error updating admin with ID ${selectedAdmin.id}:`, error);
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
    setUpdatedAdminData({
      ...updatedAdminData,
      [name]: value
    });
  };

  return (
    <Container>
      {admins.map((admin) => (
        <div key={admin.id} className="border rounded p-3 mb-3">
          <Row>
            <Col>
              <div>
                <strong>Name:</strong> {admin.userName}
              </div>
            </Col>
            <Col>
              <div>
                <strong>Email:</strong> {admin.email}
              </div>
            </Col>
            <Col>
              <Button variant="primary" onClick={() => handleViewDetails(admin)}>
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
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAdminName">
              <Form.Label>Name</Form.Label>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateAdmin}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admins;
