import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";



const Login = ({baseData, isLoggin}) => {

    const navigate = useNavigate();
    const [emailEntered, setEmailEntered] = useState("");
    const [passEntered, setPassEntered] = useState("");

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

        const user = baseData.find((user) => (
        user.email.toLowerCase() === emailEntered.toLowerCase() &&  
        user.password.toLowerCase() === passEntered.toLowerCase()))
        
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
    baseData: PropTypes.array,
    isLoggin: PropTypes.func.isRequired,
};

export default Login;