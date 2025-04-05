import { toast } from "react-toastify";
import Styles from "./SignupPage.module.css";
import { useState } from "react";
import { signup } from "../../services/api";
import { useNavigate } from 'react-router';

export const SignupPage = () => {
  const [signupData, setSignupData] = useState({name: "", email: "", mobile:"",  password: "", retypePassword: "",  });
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
	e.preventDefault();
	if(signupData.name == "" || signupData.email == "" || signupData.mobile == "" || signupData.password == "" || signupData.password == "" || signupData.retypePassword == "") {
		toast.error("All fields are necessary");
		return;
	}
	if(signupData.password != signupData.retypePassword) {
		toast.error("Passwords not matching");
		return;	
	}

	try {
		const response = await signup(signupData.name, signupData.email, signupData.password, signupData.mobile);
		toast.success(response?.data?.message)
		setSignupData({name: "", email: "", mobile:"",  password: "", retypePassword: ""});
		navigate('/login')
	} catch (error) {
		console.error("Error posting data:", error);
		toast.error(error.response.data.message)
	}

	console.log(signupData)
  };

  const redirectToSignup = () => {
    navigate("/login");
  }

  return (
	<div className={Styles.container}>
	  <div className={Styles.row}>
		<div className={Styles.left}>
			{/* <img src="/logo.png" className={Styles.logoImg} alt="Logo" /> */}
			RoomBook
		</div>
		<div className={Styles.right}>
		  <div className={Styles.formContainer}>
			<div className={Styles.heading}>Sign up</div>

			<form onSubmit={handleSubmit} className={Styles.formSection}>
			  <div className={Styles.inputGroup}>
				<input
				  className={Styles.input}
				  type="text"
				  placeholder="Enter Name"
				  onChange={(e) =>
					setSignupData({ ...signupData, name: e.target.value })
				  }
				/>
			  </div>
			  <div className={Styles.inputGroup}>
				<input
				  className={Styles.input}
				  type="text"
				  placeholder="Enter e-mail"
				  onChange={(e) =>
					setSignupData({ ...signupData, email: e.target.value })
				  }
				/>
			  </div>
			  <div className={Styles.inputGroup}>
				<input
				  className={Styles.input}
				  type="text"
				  placeholder="Enter mobile"
				  onChange={(e) =>
					setSignupData({ ...signupData, mobile: e.target.value })
				  }
				/>
			  </div>
			  <div className={Styles.inputGroup}>
				<input
				  className={Styles.input}
				  type="password"
				  placeholder="Enter Password"
				  onChange={(e) =>
					setSignupData({ ...signupData, password: e.target.value })
				  }
				/>
			  </div>
			  <div className={Styles.inputGroup}>
				<input
				  className={Styles.input}
				  type="password"
				  placeholder="re-type password"
				  onChange={(e) =>
					setSignupData({ ...signupData, retypePassword: e.target.value })
				  }
				/>
			  </div>

			  <div className={Styles.loginPage} onClick={redirectToSignup}>
					Already a user? Login.
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

