import Cookies from 'js-cookie';

export const isLoggedIn = () => {
    const accessToken = Cookies.get("userId");
    if (accessToken) {
        return true;
    } else {
        return false;
    }
}

export const isAdminLoggedIn = () => {
    const accessToken = Cookies.get("userId");
    const userRole = Cookies.get("role");
    if (accessToken && userRole == "admin") {
        return true;
    } else {
        return false;
    }
}