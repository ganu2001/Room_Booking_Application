import { toast } from "react-toastify";
import Styles from "./SignupPage.module.css";
import { useState } from "react";

export const SignupPage = () => {
  const [signupData, setSignupData] = useState({name: "", email: "", mobile:"",  password: "", retypePassword: "",  });

  const handleSubmit = async(e) => {
	e.preventDefault();
	if(signupData.name == "" || signupData.email == "" || signupData.mobile == "" || signupData.password == "" || signupData.password == "" || signupData.retypePassword == "") {
		toast.error("All fields are necessary");
		return;
	}
	if(signupData.password != setSignupData.retypePassword) {
		toast.error("Passwords not matching");
		return;	
	}

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

	console.log(signupData)
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

