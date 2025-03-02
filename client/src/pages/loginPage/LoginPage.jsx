import { useNavigate } from "react-router";
import Styles from "./LoginPage.module.css";
import { useState } from "react";
import { login } from "../../services/api";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


export const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginData.email, loginData.password);
      
      if(response.status == 200) {
        Cookies.set('userId' , response.data.userData._id);
        Cookies.set('userName' , response.data.userData.name);
        Cookies.set('role', response.data.userData.role);
        toast.success(response.data.message)
        navigate('/')
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error(error.response.data.message)
    }
  };


  return (
    <div className={Styles.container}>
      <div className={Styles.row}>
        <div className={Styles.left}>
          {/* <img src="/logo.png" className={Styles.logoImg} alt="Logo" /> */}
		          RoomBook
        </div>
        <div className={Styles.right}>
          <div className={Styles.formContainer}>
            <div className={Styles.heading}>Login</div>

            <form onSubmit={handleSubmit} className={Styles.formSection}>
              <div className={Styles.inputGroup}>
                <input
                  className={Styles.input}
                  type="text"
                  placeholder="Username or e-mail"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className={Styles.inputGroup}>
                <input
                  className={Styles.input}
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>

              <button type="submit" className={Styles.btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

