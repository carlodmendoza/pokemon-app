import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Paper, TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";

const styles = {
  box: {
    display: "flex",
    height: "100vh",
    bgcolor: "background.dark",
  },
  paper: {
    m: "0 auto",
    p: "50px",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "380px",
    width: "350px",
    bgcolor: "background.main",
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      bgcolor: "background.light",
      color: "text.main",
      "& fieldset": {
        borderStyle: "none",
      },
      "&:hover fieldset": {
        border: "1px solid",
        borderColor: "primary.main",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid",
        borderColor: "primary.main",
      },
    },
  },
  alert: {
    mt: "50px",
  },
  button: {
    mt: "20px",
    p: "10px",
    color: "white",
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line
  const [token, setToken, removeToken] = useCookies(["authToken"]);

  const credentials = [
    {
      username: "admin",
      password: "admin",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = credentials.find((user) => user.username === username);
    if (userData) {
      if (userData.password !== password) {
        setErrorMessage("Invalid username or password!");
      } else {
        setErrorMessage("");
        setToken("authToken", "justasamplecookie", {
          maxAge: 14400,
          path: "/",
          sameSite: "strict",
          secure: true,
        });
      }
    } else {
      setErrorMessage("Invalid username or password!");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Box sx={styles.box}>
        <Paper sx={styles.paper}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              sx={styles.textfield}
              placeholder="Enter username"
              fullWidth
              hiddenLabel
              required
              onChange={(event) => handleUsernameChange(event)}
            />
            <TextField
              sx={{ ...styles.textfield, mt: "20px" }}
              placeholder="Enter password"
              type="password"
              fullWidth
              hiddenLabel
              required
              onChange={(event) => handlePasswordChange(event)}
            />
            {errorMessage !== "" ? (
              <Alert sx={styles.alert} severity="error">
                {errorMessage}
              </Alert>
            ) : (
              <></>
            )}
            <Button
              sx={{
                ...styles.button,
                mt: errorMessage !== "" ? "20px" : "50px",
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default Login;
