import Styles from "./LoginPage.module.css";
import { useState } from "react";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.row}>
        <div className={Styles.left}>
          {/* <img src="/logo.png" className={Styles.logoImg} alt="Logo" /> */}
		  ROOM
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

