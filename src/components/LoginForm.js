import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "./form";
import * as myConstant from "../constant";
import { Stack, IconButton, InputAdornment, Button, Box } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginForm() {
  const defaultValues = {
    username: myConstant.TEST_USERNAME,
    password: myConstant.TEST_PASSWORD,
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // get auth context to use sign in function from auth provider
  const auth = useContext(AuthContext);

  // handle click on login button
  const handleLogin = (formData) => {
    let from = location.state?.from?.pathname || "/";
    let username = formData.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
    maxWidth: "500px",
  };

  const textFieldStyle = {
    "& label.Mui-focused": {
      color: "rgb(215, 71, 66)",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(215, 71, 66)",
      },
    },
  };

  return (
    <Box sx={style}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={3}>
          <FTextField sx={textFieldStyle} name="username" label="User name" />
          <FTextField
            name="password"
            label="Password"
            sx={textFieldStyle}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              color: "white",
              backgroundColor: "rgb(215, 71, 66)",
              "&:hover": {
                backgroundColor: "rgb(150, 49, 46)",
              },
            }}
            size="small"
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default LoginForm;
