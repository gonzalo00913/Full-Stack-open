import React from "react";

function LoginForm({handleLogin, handleUsernameChange, handlePasswordChange ,username, password}) {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            /* onChange={(e) => setUsername(e.target.value)} */
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            /* onChange={(e) => setPassword(e.target.value)} */
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
