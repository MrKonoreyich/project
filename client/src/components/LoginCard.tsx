import Form from 'react-bootstrap/Form';
import {FC, useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Card';
const LoginCard: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);
    return (
        <Container className="d-flex vh-100">
            <Row className="m-auto align-self-center">
                <Col>
                    <Card style={{ width: '19rem' }} className={""}>
                        <Card.Title className={'fs-1'}>Вход</Card.Title>
                        <Form className={"px-2"}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Почта</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword"  >
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button type="submit" className="mb-2" onClick={(e) => {
                                e.preventDefault();
                                store.login(email, password);
                            }}>
                                Войти
                            </Button><br/>
                            <Card.Footer>
                                <Card.Text><a href="" onClick={(e) => {
                                    e.preventDefault();
                                    store.registration(email, password)
                                }}>Нет аккаунта? Создать</a></Card.Text>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginCard;