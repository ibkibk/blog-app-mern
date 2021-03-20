import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "20px",
    border: "1px solid #1000d0",
    width: "400px",
    margin: "auto",
  },
  sign: {
    color: "black",
    textDecoration: "none",
  },
  form: {
    padding: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  fileInputs: {
    width: "auto",
    margin: "10px 0",
    marginLeft: "90px",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
