import React, { FC, Fragment, useState, useEffect } from 'react';
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../helpers/methods.ts";
import { UserModel } from "../models/users.ts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: FC = () => {

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    let navigate = useNavigate();

    useEffect(() => {
        let currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            //Redirigir a login
            return navigate("/");
        }
    }, []);

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

    const handleLogin = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        let user = new UserModel()
        user.userName = username;
        user.password = password;
        if (login(user)) {
            navigate("/");
        } else {
            toast('Usuario o contraseña incorrecta.', {
                position: "top-right",
                autoClose: 2000,
            });;
        }
    };

    return (
        <Fragment>
            <div style={{ width: "100%" }}>
                <Card className='card-login' style={{ alignItems: "center" }}>
                    <ToastContainer></ToastContainer>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
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
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Contraseña"
                                onChange={handleChangePass}
                            />
                        </Form.Group>
                        <Button variant="outline" type="submit" className="button-sub" disabled={username.length === 0 || password.length === 0}>
                            Ingresar
                        </Button>
                        <p><Link to="/register" className="text-us">Aún no tengo un usuario</Link></p>
                    </Form>
                </Card>
            </div>
        </Fragment>
    )
}

export default Login;