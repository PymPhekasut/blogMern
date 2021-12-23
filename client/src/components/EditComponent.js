import { useState, useEffect } from "react";
import NavBarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../services/authorize";

const EditComponent = (props) => {
    const [state, setstate] = useState({
        title: "",
        content: "",
        author: "",
        slug: ""
    });
    const { title, content, author, slug } = state;

    //Get data to be updated
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                const { title, content, author, slug } = response.data;
                //console.log(response.data)
                setstate({ ...state, title, content, author, slug });
            }).catch(err => alert(err));

        // eslint-disable-next-line
    }, []);



    const showUpdateForm = () => (
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
            <input type="submit" value="update" className="btn btn-primary" />

        </form>
    );



    //set value to state
    //name is parameter: title, content, author
    const inputValue = name => event => {
        //console.log(name, "=", event.target.value);
        //use setState to fill value which ref by name:prm title, content, author
        setstate({ ...state, [name]: event.target.value });
    };

    //Send update tp api
    const submitForm = (e) => {
        e.preventDefault();
        //console.table({ title, content, author });
        console.log("API URL = ", process.env.REACT_APP_API);
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author },
            {
                headers: {
                    authorization: `Bearer ${getToken()} `
                }
            })

            .then(response => {
                //alert("Your blog has been saved successfully");
                Swal.fire(
                    'Congratulation!',
                    'Your blog has been updated successfully!',
                    'success');
                const { title, content, author, slug } = response.data;
                setstate({ ...state, title, content, author, slug });

                //setstate({ ...state, title: "", content: "", author: "" })

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
            <h1>Update Blog</h1>
            {showUpdateForm()}
        </div>

    );
};

export default EditComponent;