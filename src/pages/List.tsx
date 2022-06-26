import React, { FC, Fragment, useState, useEffect } from "react";
import { Form, FormControl, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Swal from 'sweetalert2';
import { getFromLocalStorageCurrent, addTaskCurrentUser, removeTaskCurrentUser, editTaskCurrentUser } from "../helpers/methods.ts";


type FormElement = React.FormEvent<HTMLFormElement>;

//JSX.Element
const List: FC = () => {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<string[]>([]);

    let navigate = useNavigate();

    const refreshTodos = () => {
        let data = getFromLocalStorageCurrent();
        if (data) {
            setTodos(data.tasks)
        }
    }

    useEffect(() => {
        let currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            //Redirigir a login
            return navigate("/Login");
        }
        refreshTodos();
    }, []);

    const addTodo = (text: string): void => {
        addTaskCurrentUser(text);
        refreshTodos()
    };

    const handleSubmit = (e: FormElement): void => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    };

    const deleteTodo = (index: number): void => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-outline-secondary',
            }
        })
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro que quieres eliminar esta tarea?',
            icon: 'question',
            confirmButtonText: 'Si',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'La tarea fue eliminada con éxito!',
                )
                removeTaskCurrentUser(index)
                refreshTodos();
            }
        })
    };

    const editTodo = (index: number): void => {
        Swal.fire({
            title: 'Edite su tarea',
            input: 'text',
            inputValue: todos[index],
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'La tarea fue editada con éxito!',
                )
                editTaskCurrentUser(index, result.value);
                refreshTodos();
            }
        })
    };

    const logOut = () => {
        localStorage.removeItem('currentUser');
        navigate("/Login");
    }

    return (
        <Fragment>
            <Card>
                <Card.Body className="title">Todo App
                    <span className="rutas">
                        <Button onClick={logOut} className="botonOut">SALIR</Button>
                    </span>

                </Card.Body>
            </Card>
            <Container className="container-center">
                <Card className="row justify-content-sm-center">
                    <Form onSubmit={handleSubmit} className="form-center">
                        <FormControl
                            type="text"
                            placeholder="Enter Title"
                            className="me-2"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="outline" className="button-color">ADD</Button>
                    </Form>
                </Card>
            </Container>
            <Container>
                <Card className="card-list">
                    {todos.map((todo: string, index: number) => {
                        return (
                            <Card.Text
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "80%"
                                }}
                            >
                                <div><BsFillCheckCircleFill className="icon" />{todo}</div>
                                <div>
                                    <Button type="button" variant="outline" className="buttons-color" onClick={(): void => editTodo(index)}>
                                        <BsPencilFill />
                                    </Button>
                                    <Button type="button" variant="outline" className="buttons-color" onClick={(): void => deleteTodo(index)}>
                                        <BsTrashFill />
                                    </Button>
                                </div>
                            </Card.Text>
                        );
                    })}
                </Card>
            </Container>
        </Fragment>
    );
}
export default List;