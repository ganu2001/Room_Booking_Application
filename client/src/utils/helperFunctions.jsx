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

export const calculateTax = (price) => {
    return Math.round(price * 0.05);
}

export const calculateTotal = (price) => {
    return Math.round(price + (price * 0.05));
}


export const calculateAdvance = (price) => {
    const totalPrice = price + (price * 0.05)
    return Math.round(totalPrice * 0.3);
}

export const calculateCheckout = (price) => {
    const totalPrice = price + (price * 0.05)
    return Math.round(totalPrice * 0.7);
}

