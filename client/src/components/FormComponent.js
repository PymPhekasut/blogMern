import { useState } from "react";
import NavBarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser, getToken } from "../services/authorize";

const FormComponent = () => {
    const [state, setstate] = useState({
        title: "",
        content: "",
        author: getUser()
    });
    const { title, content, author } = state;
    //set value to state
    //name is parameter: title, content, author
    const inputValue = name => event => {
        //console.log(name, "=", event.target.value);
        //use setState to fill value which ref by name:prm title, content, author
        setstate({ ...state, [name]: event.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        //console.table({ title, content, author });
        console.log("API URL = ", process.env.REACT_APP_API);
        axios.post(`${process.env.REACT_APP_API}/create`,
            { title, content, author },
            {
                headers: {
                    authorization: `Bearer ${getToken()} `
                }
            })
            .then(response => {
                //alert("Your blog has been saved successfully");
                Swal.fire(
                    'Congratulation!',
                    'Your blog has been saved successfully!',
                    'success'
                );
                setstate({ ...state, title: "", content: "", author: "" });
            }).catch(err => {
                //alert(err.response.data.error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            });
    };

    //  {JSON.stringify(state)}
    return (
        <div className="container p-5">
            <NavBarComponent />
            <h1>Create Blog</h1>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label> Blog name</label>
                    <input type="text" className="form-control"
                        value={title}
                        onChange={inputValue("title")} />
                </div>
                <div className="form-group">
                    <label> What about?</label>
                    <textarea className="form-control"
                        value={content}
                        onChange={inputValue("content")}></textarea>
                </div>
                <div className="form-group">
                    <label> Author</label>
                    <input type="text" className="form-control"
                        value={author}
                        onChange={inputValue("author")} />
                </div>
                <br />
                <input type="submit" value="save" className="btn btn-primary" />

                <a className="btn btn-success" href="/"> Back </a>

            </form>
        </div>

    );
};

export default FormComponent;