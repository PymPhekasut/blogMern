import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../services/authorize";

const NavBarComponent = ({ history }) => {

    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link"> Home </Link>
                </li>

                {
                    !getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to="/login" className="nav-link"> Login</Link>
                        </li>)
                }
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to="/create" className="nav-link"> Create Blog </Link>
                        </li>)
                }
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <button className="nav-link" onClick={() => logout(() => history.push("/"))}> Log out</button>
                        </li>)
                }


            </ul>
        </nav>
    );
};

export default withRouter(NavBarComponent);