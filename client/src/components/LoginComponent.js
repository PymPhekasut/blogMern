import NavBarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {
    const [state, setstate] = useState({
        username: "",
        password: "",
    });
    const { username, password } = state;

    const inputValue = name => event => {
        setstate({ ...state, [name]: event.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(response => {
                //login successfully
                authenticate(response, () => props.history.push("/"));
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username or Password is not correct!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            });
    };
    useEffect(() => {
        getUser() && props.history.push("/");
    }, []);

    return (
        <div className="container p-5">
            <NavBarComponent />
            <h1>Login | admin </h1>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        value={username}
                        onChange={inputValue("username")} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control"
                        value={password}
                        onChange={inputValue("password")} />
                </div>
                <br />
                <input type="submit" value="Login" className="btn btn-primary" />


            </form>
        </div>);

};

export default withRouter(LoginComponent);