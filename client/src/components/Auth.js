import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { useFormik }from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Auth({ setUser}) {
    const [signUp, setSignUp ] = useState(true)
    const navigate = useNavigate();

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
        onSubmit: async (values) => {
            const endpoint = signUp ? '/users' : '/login'
            try {
                const response = await fetch(endpoint, {
                  method: 'POST',
                  headers: {
                    "Content-Type": 'application/json',
                  },
                  body: JSON.stringify(values),
                });
        
                if (response.ok) {
                  const data = await response.json();
                  setUser(data.user || data);
                  navigate('/recipes');
                } else {
                    const errorMessage = await response.text();
                    console.error('Login failed:', errorMessage);
                    formik.setErrors({ login: errorMessage });
                }
              } catch (error) {
                console.error('Error:', error);
              }
            },
    });
    function toggleSignUp() {
        setSignUp((currentSignUp) => !currentSignUp)
    }
    


    return (
        <Container className="auth-container d-flex flex-column">
            <Button onClick={toggleSignUp} variant="primary">
                {signUp ? 'Please login to see recipes!' : 'Signup to see the app!'}
            </Button>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label></Form.Label>
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
                    <Form.Label></Form.Label>
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
                        <Form.Label></Form.Label>
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
                <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Auth;