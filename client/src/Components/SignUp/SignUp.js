import React, { useEffect, useState } from "react";
import "../SignIn/Sigin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RestApiUrl } from "../../URL";

const APIURL = RestApiUrl + "signup";
export default function SignUpComp() {
  const [username, Setusername] = useState("");
  const [password, SetPassword] = useState("");
  const [CnfrmPswd, SetCnfrmPswd] = useState("");
  const [Validatepassword, SetValidatePassword] = useState("");
  const [Validatecnfmpassword, SetValidatecnfmPassword] = useState("");
  const [Validateusername, SetValidateusername] = useState("");
  const [Data, SetData] = useState({});
  useEffect(() => {
    SetData({
      username: username,
      password: password,
    });
  }, [username, password]);

  const validate = () => {
    let valid = true;
    if (username === "") {
      SetValidateusername("*Username can't be empty...!");
      return (valid = false);
    }
    if (password === "") {
      SetValidatePassword("*Password can't be empty ...!");
      return (valid = false);
    }

    if (!(CnfrmPswd === password)) {
      SetValidatecnfmPassword(
        "*Password & Confirm Password should be Same ...!"
      );
      return (valid = false);
    }
    return valid;
  };
  const HandleLogin = () => {
    debugger
    if (validate()) {
      try {
        axios.post(APIURL, Data).then((res) => {
          console.log(res.data);
          if (res.data === "success") {
            alert("Account Created...!")
            nav("/");
          } else {
            alert(res.data);
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const nav = useNavigate();
  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
  
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
  
              <button type="button" className="btn btn-primary btn-floating mx-1">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div> */}

                <div className="divider d-flex justify-content-left my-4">
                  <p className="text-left fw-bold mx-3 mb-0">
                    Create Account..!
                  </p>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    onChange={(e) => Setusername(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Enter a valid Username"
                    required
                  />
                  <span>{Validateusername}</span>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <label className="form-label">Create Password</label>
                  <input
                    type="password"
                    onChange={(e) => SetPassword(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Create password"
                    required
                  />
                  <span>{Validatepassword}</span>
                </div>
                {/* <!-- confirm  Password input --> */}

                <div className="form-outline mb-3">
                  <label className="form-label"> Confirm Password</label>
                  <input
                    type="password"
                    onChange={(e) => SetCnfrmPswd(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    required
                  />
                  <span>{Validatecnfmpassword}</span>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={HandleLogin}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
