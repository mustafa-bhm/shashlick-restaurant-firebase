import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navitage("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div style={styles.login}>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Login
        </button>
        {error && <span style={styles.span}>Wrong email or password!</span>}
      </form>
    </div>
  );
};

const styles = {
  input: {
    width: "200px",
    height: "30px",
    margin: "10px",
  },
  login: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  button: {
    width: "200px",
    height: "30px",
    border: "none",
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  span: { fontSize: "12px", color: "red", marginTop: "10px" },
};

export default Login;
