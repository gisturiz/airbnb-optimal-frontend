import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (() => {
    const id = localStorage.getItem('id')
    this.props.history.push(`/dashboard/${id}`)
  })

  logout = (() => {
    localStorage.removeItem('token');
    this.props.history.push('/')
  });

  render() {
    const background = {
      background: '#FF5A5F',
      width: "100%"
    }

    const borderWidth = {
      borderColor: '#FF5A5F',
    }

    const logo = {
      fontFamily: 'Pacifico',
      textStroke: '2px #00A699',
      color: 'white',
      margin: '0 auto',
      fontSize: '1.5em'
    }

    const navLinks = {
      padding: "0",

    }
    const { activeItem } = this.state

    return (
      <Segment inverted style={background}>
        <Menu inverted pointing secondary style={borderWidth}>
          <Menu.Item
            style={navLinks}
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            style={logo}
            name='Airbnb Optimizer'
          />
          <Menu.Item
            style={navLinks}
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.logout}
          />
        </Menu>
      </Segment>
    )
  }
}
export default withRouter(MenuExampleInvertedSecondary);