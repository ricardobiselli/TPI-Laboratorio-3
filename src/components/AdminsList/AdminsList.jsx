import { useState, useEffect } from "react";
import { getAdmins } from '../../api/ApiConnection';
import { Container, Row, Col } from 'react-bootstrap'; 


const Admins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const data = await getAdmins();
                console.log('data', data);
                setAdmins(data.$values || []);
            } catch (error) {
                console.error('fetch clients failed!!!', error);
            }
        };
        fetchAdmins();
    }, [])
    return (
        <Container>
            {admins.map((admin) => (
                <div key={admin.id} className="border rounded p-3 mb-3">
                    <Row>
                        <Col>
                            <div><strong>Name:</strong> {admin.userName}</div>
                        </Col>
                        <Col>
                            <div><strong>Last Name:</strong> {admin.email}</div>
                        </Col>
                       
                    </Row>
                  
                </div>
            ))}
        </Container>
    );
};

export default Admins;