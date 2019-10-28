import React, { useState } from 'react'
import './Signup.css'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { axiosWithAuth } from './utils/axiosWithAuth';
import './index.css';

const button = {
  background: '#FF5A5F',
  color: 'white'
}

const DividerExampleVerticalForm = (props) => {

  const [users, setUsers] = useState({ username: '', password: '' })

  const handleChange = e => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/auth/login', users)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.users_id)
        props.history.push(`/dashboard/${res.data.users_id}`);
      })
  }

  const routeSignup = () => {
    props.history.push('/signup');
  }

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form onSubmit={login}>
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
              placeholder='Password'
              onChange={handleChange}
              value={users.password}
            />

            <Button content='Login' style={button} />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Button content='Sign up' icon='signup' size='big' onClick={routeSignup} />
        </Grid.Column>
      </Grid>

      <Divider vertical className="divider">Or</Divider>
    </Segment>
  )
}

export default DividerExampleVerticalForm
