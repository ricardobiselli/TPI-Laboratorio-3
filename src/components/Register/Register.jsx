import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addClient, getClients } from "../../api/ApiConnection";

const Register = () => {
    const navigate = useNavigate();

    const [emailEntered, setEmailEntered] = useState("");
    const [passEntered, setPassEntered] = useState("");
    const [passConfirmEntered, setPassConfirmEntered] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [userName, setUserName] = useState("");
    const [dni, setDni] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const clickHandler = () => {
        navigate("/");
    };

    const submitUser = async (event) => {
        event.preventDefault();

        try {
            const data = await getClients();
            const clients = data.$values || [];

            const emailExists = clients.find((client) => client.email === emailEntered);
            const userNameExists = clients.find((client) => client.userName === userName);

            if (emailExists) {
                window.alert("El email ingresado ya se encuentra registrado");
                return;
            }

            if (userNameExists) {
                window.alert("El nombre de usuario ya existe, intente con otro");
                return;
            }

            if (passEntered !== passConfirmEntered) {
                window.alert("Las contraseñas ingresadas deben ser iguales");
                setPassConfirmEntered("");
                return;
            }

            if (!emailExists && !userNameExists && passEntered === passConfirmEntered) {
                const newClient = {
                    userName: userName,
                    email: emailEntered,
                    password: passEntered,
                    userType: "client",
                    firstName: name,
                    lastName: surname,
                    dniNumber: dni,
                    birthDate: birthday,
                    address: address,
                    phoneNumber: phone,
                }

                try {
                    await addClient(newClient);
                    setUserName('');
                    setEmailEntered('');
                    setPassEntered('');
                    setPassConfirmEntered('');
                    setName('');
                    setSurname('');
                    setDni('');
                    setBirthday('');
                    setAddress('');
                    setPhone('');
                    window.alert("Registro exitoso, ya puede iniciar sesión");
                    navigate("/");
                } catch (error) {
                    console.error('Add Client has failed', error);
                }
            }
        } catch (error) {
            console.error('fetch client failed!!!', error);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="p-4">
                        <Card.Body>
                            <h3 className="text-center mb-4">Registrarse</h3>
                            <Form onSubmit={submitUser}>
                                <Form.Group className="mb-3" controlId="formBasicUserName">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user name"
                                        onChange={(e) => setUserName(e.target.value)}
                                        value={userName}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmailEntered(e.target.value)}
                                        value={emailEntered}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicSurname">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter surname"
                                        onChange={(e) => setSurname(e.target.value)}
                                        value={surname}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicBirthday">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        onChange={(e) => setBirthday(e.target.value)}
                                        value={birthday}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDni">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter id"
                                        onChange={(e) => setDni(e.target.value)}
                                        value={dni}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckPhone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter address"
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassEntered(e.target.value)}
                                        value={passEntered}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckPassword">
                                    <Form.Label>Repita su contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        onChange={(e) => setPassConfirmEntered(e.target.value)}
                                        value={passConfirmEntered}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Enviar Registro
                                </Button>
                            </Form>
                            <Button variant="secondary" onClick={clickHandler} className="w-100 mt-3">
                                Volver
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


export default Register;


