import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";



const Register = ({baseData, sendData}) => {

    const navigate = useNavigate();
    const [emailEntered, setEmailEntered] = useState("");
    const [passEntered, setPassEntered] = useState("");
    const [passConfirmEntered, setPassConfirmEntered] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState(""); 


    const clickHandler = () => {
        navigate("/");
    };

    const submitUser = (event) => {
        event.preventDefault();

        const user = baseData.find((user) => (
        user.email === emailEntered))
        
        if(user){
            window.alert("El email ingresado ya se encuentra registrado")
        }

        if (passEntered !== passConfirmEntered) {
            window.alert("Las contraseñas ingresadas deben ser iguales");
            setPassConfirmEntered("")
        }

        if(!user && passEntered === passConfirmEntered ){
            sendData({
                email: emailEntered,
                password: passEntered,
                name: name,
                surname: surname,
                birthday: birthday,
            })
            setEmailEntered("");
            setPassEntered("");
            setName("");
            setSurname("");
            setBirthday("");
            setPassConfirmEntered("");
            window.alert("Registro exitoso, ya puede iniciar sesión")
            navigate("/");
        }
      
    };

  
    
    return (
        <div className='login template d-flex justify-content-center aling-items-center 100-w 100-vh bg-white'>
            <div className='40-w p-5 rounded bg-secondary'>
                <Form onSubmit={submitUser}>
                    <h3>Registrarse</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmailEntered(e.target.value)} value={emailEntered}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="name" placeholder="Enter surname" onChange={(e) => setSurname(e.target.value)} value={surname}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBrithday">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control type="date" onChange={(e) => setBirthday(e.target.value)} value={birthday}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassEntered(e.target.value)} value={passEntered}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckPassword">
                        <Form.Label>Repita su contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) =>  setPassConfirmEntered(e.target.value)} value={passConfirmEntered}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar Registro
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

Register.propTypes = {
    baseData: PropTypes.array,
    sendData: PropTypes.func.isRequired,
};

export default Register;