import React from 'react';
import {register} from  '../actions';
import { connect } from 'react-redux';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    

    handleSubmit(event) {
        event.preventDefault();
        let { userName, password } = this.state;
        let newUser = { userName, password  };
        // call function
        this.props.register(newUser);
        //redirect to home
        this.props.history.push('/Home');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up 
                    </h1>
                    <p>Fill in the form below to create an account.</p>
                    <div>
                        <input placeholder="UserName" name="userName" onChange={this.handleChange} value={this.state.userName} type="text"></input>
                        <input placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                    <hr></hr>
                    {/* <p>Already have an account? <Link to="/login">Login</Link></p> */}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({   
});

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

