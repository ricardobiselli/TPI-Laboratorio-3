import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { getClient } from "../../api/ApiConnection";
import { useEffect } from "react";


const Login = ({isLoggin}) => {

    const [client, setClient] = useState([]);

    const navigate = useNavigate();

    const [emailEntered, setEmailEntered] = useState("");
    const [passEntered, setPassEntered] = useState("");
    

    useEffect(() => {
        const fetchClient = async () => { 
          try {
            const data = await getClient();
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
        isLoggin(false);
    };

    const emailHandler = (e) => {
        setEmailEntered(e.target.value);
    };

    const passHandler = (e) => {
        setPassEntered(e.target.value);
    };

    const submitUser = (event) => {
        event.preventDefault();

        const user = client.find((user) => (
        user.email == emailEntered &&  
        user.password == passEntered))
        
        if(user){
            isLoggin(true);
            navigate("/"); 
        } else {window.alert("Usuario o contraseña inválidos")
        setEmailEntered("");
        setPassEntered("");
    };
    
    };


    return (
        <div className='login template d-flex justify-content-center aling-items-center 100-w 100-vh bg-white'>
            <div className='40-w p-5 rounded bg-secondary'>
                <Form onSubmit={submitUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h3>Iniciar Sesión</h3>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={emailHandler} value={emailEntered}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={passHandler} value={passEntered}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                    <p></p>
                </Form>
                <Button variant="secondary" onClick={clickHandler}>
                    Volver
                </Button>
            </div>
        </div>
    );
};


Login.propTypes = {
    isLoggin: PropTypes.func.isRequired,
};

export default Login;