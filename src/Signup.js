import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { axiosWithAuth } from './utils/axiosWithAuth';

const button = {
    background: '#FF5A5F',
    color: 'white'
}

const loggedIn = {
    marginTop: "10px",
    color: "#0000EE",
    cursor: "pointer"
}

const DividerExampleVerticalForm = (props) => {

    const [users, setUsers] = useState({ username: '', password: '' })

    const handleChange = e => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value,
        })
    }

    const register = e => {
        e.preventDefault();
        console.log(users);
        axiosWithAuth()
            .post('/auth/register', users)
            .then(res => {
                alert("You've registered successfully.");
                props.history.push('/');
            })
    }

    const routeLogin = () => {
        props.history.push('/');
      }

    return (
        <Segment placeholder>
            <Grid columns={1} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit={register}>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            name='username'
                            placeholder='Username'
                            onChange={handleChange}
                            value={users.username}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            name='password'
                            type='password'
                            onChange={handleChange}
                            value={users.password}
                        />

                        <Button content='Register' style={button} />
                        <p>Already a user?</p>
                        <p onClick={routeLogin} style={loggedIn}><strong>Login</strong></p>
                    </Form>
                </Grid.Column>

                {/* <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column> */}
            </Grid>

            {/* <Divider vertical>Or</Divider> */}
        </Segment>
    )
}

export default DividerExampleVerticalForm