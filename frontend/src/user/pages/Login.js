import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const history = useHistory();
  const [msg, setMsg] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const errors = useSelector((state) => state.auth.error);
  console.log(errors);
  useEffect(() => {
    if (errors) {
      return setMsg({ msg: errors });
    }
  }, [errors]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <Typography style={{ color: "red" }} component="h1" variant="h5">
          {errors.error}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                onChange={handleChange}
                autoFocus
                // value={formData.fullName}
              />
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={handleChange}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // value={formData.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // value={formData.password}
          />
          {isSignup && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Repeat Password"
              onChange={handleChange}
              type="password"
              // value={formData.confirmPassword}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}{" "}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
