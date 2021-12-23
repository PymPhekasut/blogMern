//store data/token and username => session storage
export const authenticate = (response, next) => {
    if (window !== "undefined") {
        //store data to session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("user", JSON.stringify(response.data.username));
    }
    next();
};

//get token
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"));
        } else {
            return false;
        }
    }
};;

//get data of user
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"));
        } else {
            return false;
        }
    }
};;

// Log out
export const logout = (next) => {
    if (window !== "underdefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }
    next();
};