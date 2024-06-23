
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClients } from "../../api/ApiConnection";


const Login = () => {

    const [client, setClient] = useState([]);

    const navigate = useNavigate();

    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [passEntered, setPassEntered] = useState("");


    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClients();
                console.log('data', data);
                setClient(data.$values || []);
            } catch (error) {
                console.error('fetch client failed!!!', error);
            }
        };

        fetchClient();
    }, []);

    const clickHandler = () => {
        navigate("/");
    };

    const emailOrUsernameHandler = (e) => {
        setEmailOrUsername(e.target.value);
    };

    const passHandler = (e) => {
        setPassEntered(e.target.value);
    };
    

    const submitUser = (event) => {
        event.preventDefault();
        const user = client.find((user) =>
            (user.email === emailOrUsername || user.userName === emailOrUsername) &&
            user.password === passEntered
        );

        if (user) {
            navigate("/");
        } else {
            window.alert("Usuario o contraseña inválidos");
            setEmailOrUsername("");
            setPassEntered("");
        }
    };



    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="p-4">
                        <Card.Body>
                            <h3 className="text-center mb-4">Iniciar Sesión</h3>
                            <Form onSubmit={submitUser}>
                                <Form.Group className="mb-3" controlId="formBasicEmailOrUsername">
                                    <Form.Label>Correo electrónico o Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su mail o usuario"
                                        onChange={emailOrUsernameHandler}
                                        value={emailOrUsername}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingrese su contraseña"
                                        onChange={passHandler}
                                        value={passEntered}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Iniciar sesión
                                </Button>
                            </Form>
                            <Button variant="secondary" onClick={clickHandler} className="w-100 mt-3">
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