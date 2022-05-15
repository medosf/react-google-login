import "./App.css";
import GoogleLogin from "react-google-login";
import { useState } from "react";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    try {
      const res = await fetch("/api/google-login", {
        method: "POST",
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoginData(data);
      localStorage.setItem("loginData", JSON.stringify(data));
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Login App with Google</h1>
        <div>
          {loginData ? (
            <div>
              <img src={loginData?.picture} alt="avatar" />
              <h3>Hello, {loginData?.name}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
