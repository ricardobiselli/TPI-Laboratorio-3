import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../services/authentication/AuthContext';

//INTEGRADO CON EL COMPONENTE DE LUCIANO, SE CAMBIARON ALGUNOS NOMBRES DE VARIABLES
//MI SOLO CONTEMPLA LOGEARSE CON USERNAME

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Iniciar Sesión</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Correo electrónico o Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su mail o usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Iniciar sesión
                </Button>
              </Form>
              <Button variant="secondary" className="w-100 mt-3">
                Volver
              </Button>
              <div className="text-center mt-3">
                <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;