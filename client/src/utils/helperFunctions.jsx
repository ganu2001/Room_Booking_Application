import Cookies from 'js-cookie';

export const isLoggedIn = () => {
    const accessToken = Cookies.get("userId");
    if (accessToken) {
        return true;
    } else {
        return false;
    }
}