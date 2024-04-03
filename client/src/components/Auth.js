import { useState } from 'react';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useFormik }from 'formik';
import * as yup from 'yup';

function Auth({ setUser}) {
    const [signUp, setSignUp ] = useState(true)

    const signUpSchema = yup.object().shape({
        username: yup.string().min(6, 'Username is too short!').max(12, 'Username is too long!'),
        password: yup.string().min(6, 'Password is too short!').max(12, 'Password is too long!'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password must match.')
    })
    const loginSchema = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().required('password is required')
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: signUp ? signUpSchema : loginSchema,
        onSubmit: (values) => {
            const endpoint = signUp ? '/users' : '/login'
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then(({ user }) => {
                        setUser(user)
                    })
                } else {
                    console.log('oh no! something went wrong')
                }
            })
        }
    })
    function toggleSignUp() {
        setSignUp((currentSignUp) => !currentSignUp)
    }

    return (
        <Container>
            <Button onClick={toggleSignUp} variant="primary">
                {signUp ? 'Please login!' : 'Signup to add recipes!'}
            </Button>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.username && !!formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                {signUp && (
                    <Form.Group controlId="passwordConfirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm password"
                            name="passwordConfirmation"
                            value={formik.values.passwordConfirmation}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.passwordConfirmation}
                        </Form.Control.Feedback>
                    </Form.Group>
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Auth;