import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });


    const handleRegister = (e) => {
        e.preventDefault();

        const { username, email, password } = registerData;

        if (username && email && password) {
            const user = { username, email, password };

            // حفظ المستخدم في localStorage كمجموعة مستخدمين
            localStorage.setItem('user', JSON.stringify(user));

            alert("Registration Successful!");

            setIsRegistering(false); // ارجع لصفحة تسجيل الدخول

        } else {

            alert("Please fill all fields");

        }
        
    };

    const navigate= useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const { username, password } = loginData;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            alert("No registered user found. Please sign up first.");
            return;
        }

        if (
            username === storedUser.username &&
            password === storedUser.password
        ) {
            alert("Login Successful!");
            // ممكن تخزن session في localStorage مثلا:
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);

            navigate("/home");
        } else {
            alert("Invalid username or password.");
        }
    };




    return (
        <div className={`container ${isRegistering ? 'active' : ''}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        <i className="bx bxs-lock-alt" />
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot your password?</a>
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                    <p>Or sign in with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#"><i className="fa-brands fa-github" /></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                        <i className="bx bxs-envelope" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                        <i className="bx bxs-lock-alt" />
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <p>Or sign up with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#"><i className="fa-brands fa-github" /></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                    </div>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Friend!</h1>
                    <p>Don't have an account yet?</p>
                    <button className="btn register-btn" onClick={() => setIsRegistering(true)}>
                        Sign Up
                    </button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button className="btn login-btn" onClick={() => setIsRegistering(false)}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}







