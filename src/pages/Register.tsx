import React, { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from "react-bootstrap";
import { registerUser } from "../helpers/methods.ts"
import { UserModel } from '../models/users.ts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: FC = () => {

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeUss = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setUserName(e.target.value);
    };

    const handleChangePass = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        const user = new UserModel();
        user.userName = username;
        user.password = password;
        user.tasks = [];
        if (!registerUser(user)) {
            toast('Usuario ya existe.', {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    return (
        <Fragment>
            <div style={{ width: "100%" }}>
                <Card className='card-register' style={{ alignItems: "center" }}>
                    <ToastContainer></ToastContainer>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nuevo Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                placeholder="Usuario"
                                onChange={handleChangeUss}
                            />
                            <Form.Text className="text-muted">
                                Ingrese su nombre de usuario
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Ingrese su contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Contraseña"
                                onChange={handleChangePass}
                            />
                        </Form.Group>
                        <Button variant="outline" type="submit" className="button-sub" disabled={username.length === 0 || password.length === 0}>
                            Registrar
                        </Button>
                        <p><Link to="/login" className="text-us">Ya tengo un usuario</Link></p>
                    </Form>
                </Card>
            </div>
        </Fragment>
    )
}

export default Register;