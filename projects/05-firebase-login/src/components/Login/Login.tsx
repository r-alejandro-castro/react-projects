import { Link, useNavigate  } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import InputControl from "../InputControl/InputControl";

const Login = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: ""
    });
    const [errorMsg, setErrorMsg] = useState<string | string[]>([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const login = () => {
        if(!values.email || !values.pass) {
            setErrorMsg(["All fields are required"]);
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(false);
        signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async () => {
            setSubmitButtonDisabled(false);
            navigate("/")
        })
        .catch((err) => {
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="">
            <div className="">
                <h1 className="">
                    Login
                </h1>
                <InputControl 
                    label="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <InputControl
                    label="Password"
                    placeholder="Password"
                    name="pass"
                    onChange={handleChange}
                />
                <div className="">
                    {errorMsg && <p className="">{errorMsg}</p>}
                    <button onClick={login} disabled={submitButtonDisabled} className="">
                        Login btn
                    </button>
                    <p>
                        New user?
                        <span>
                            <Link to="/singup">Create account here</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login