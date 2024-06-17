import { useState, useEffect } from "react";
import { getClients } from '../../api/ApiConnection';
import { Container, Row, Col } from 'react-bootstrap'; 


const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                console.log('data', data);
                setClients(data.$values || []);
            } catch (error) {
                console.error('fetch clients failed!!!', error);
            }
        };
        fetchClients();
    }, [])
    return (
        <Container>
            {clients.map((client) => (
                <div key={client.id} className="border rounded p-3 mb-3">
                    <Row>
                        <Col>
                            <div><strong>Name:</strong> {client.firstName}</div>
                        </Col>
                        <Col>
                            <div><strong>Last Name:</strong> {client.lastName}</div>
                        </Col>
                        <Col>
                            <div><strong>DNI Number:</strong> {client.dniNumber}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div><strong>Birth Date:</strong> {client.birthDate}</div>
                        </Col>
                        <Col>
                            <div><strong>Address:</strong> {client.address}</div>
                        </Col>
                        <Col>
                            <div><strong>Phone Number:</strong> {client.phoneNumber}</div>
                        </Col>
                    </Row>
                </div>
            ))}
        </Container>
    );
};

export default Clients;