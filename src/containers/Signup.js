import React from "react";
import {
   Button,
   Form,
   Grid,
   Header,
   Message,
   Segment,
   select,
   option,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
   state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      isstudent:"",
   };

   handleSubmit = e => {
      e.preventDefault();
      const { username, email, password1, password2,isstudent } = this.state;
      console.log(isstudent)
      let choiceval=false
      if(isstudent==="student")
      choiceval=true
      // console.log(isstudent)
      // console.log(choiceval)
      this.props.signup(username, email, password1, password2, choiceval);
   };


   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   render() {
      const { username, email, password1, password2, isstudent } = this.state;
      const { error, loading, token } = this.props;
      if (token) {
         return <Redirect to="/" />;
      }
      return (
         <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
         >
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as="h2" color="teal" textAlign="center">
                  Signup to your account
               </Header>
               {error && <p>{this.props.error.message}</p>}

               <React.Fragment>
                  <Form size="large" onSubmit={this.handleSubmit}>
                     <Segment stacked>
                        <Form.Input
                           onChange={this.handleChange}
                           value={username}
                           name="username"
                           fluid
                           icon="user"
                           iconPosition="left"
                           placeholder="Username"
                        />
                        <Form.Input
                           onChange={this.handleChange}
                           value={email}
                           name="email"
                           fluid
                           icon="mail"
                           iconPosition="left"
                           placeholder="E-mail address"
                        />
                        <Form.Input
                           onChange={this.handleChange}
                           fluid
                           value={password1}
                           name="password1"
                           icon="lock"
                           iconPosition="left"
                           placeholder="Password"
                           type="password"
                        />
                        <Form.Input
                           onChange={this.handleChange}
                           fluid
                           value={password2}
                           name="password2"
                           icon="lock"
                           iconPosition="left"
                           placeholder="Confirm password"
                           type="password"
                        />
                        <select name='isstudent' onChange={this.handleChange} value={isstudent}>
                           <option value=''>choose your type</option>
                           <option value='student'>Student</option>
                           <option value='teacher'>Teacher</option>
                        </select>
                        <Button
                           color="teal"
                           fluid
                           size="large"
                           loading={loading}
                           disabled={loading}
                        >
                           Signup
                        </Button>
                     </Segment>
                  </Form>
                  <Message>
                     Already have an account? <NavLink to="/login">Login</NavLink>
                  </Message>
               </React.Fragment>
            </Grid.Column>
         </Grid>
      );
   }
}

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      token: state.auth.token
   };
};

const mapDispatchToProps = dispatch => {
   return {
      signup: (username, email, password1, password2, isstudent) =>
         dispatch(authSignup(username, email, password1, password2, isstudent))
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(RegistrationForm);