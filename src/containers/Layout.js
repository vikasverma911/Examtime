import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class CustomLayout extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Home</Menu.Item>
            </Link>

            {authenticated ? (
              <React.Fragment>
                <Link to={`/profiles/${this.props.userID}`}>
                  <Menu.Item header>Profile</Menu.Item>
                </Link>
                {
                  this.props.is_teacher ? (
                  <Link to={`/create`}>
                    <Menu.Item header>Create</Menu.Item>
                  </Link>
                  ): null
                }
                <Menu.Item header onClick={() => this.props.logout()}>
                  Logout
                </Menu.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item header>Login</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Signup</Menu.Item>
                </Link>

              </React.Fragment>
            )}
          </Container>
        </Menu>

        

        <Container style={{paddingTop:"90px"}}>
          {this.props.children}
        </Container>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    userID: state.auth.userId,
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);