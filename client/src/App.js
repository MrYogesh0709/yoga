import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import image from "./images/yoga.png";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Card, Container, Typography } from "@mui/material";

const url = "http://localhost:1000/";
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("6-7AM");
  const [gender, setGender] = useState("male");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const fetchdata = async () => {
    try {
      await axios.post(url, {
        firstName,
        lastName,
        email,
        batch,
        gender,
        age,
        phone,
      });
      setMessage("your data has been saved");
      // window.alert("your data has been sussessfully saved");
    } catch (error) {
      setMessage(error.response.data.message);
      // window.alert(error.response.data.message);
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    fetchdata();
    handleClickOpenAlert();
    setFirstName("");
    setLastName("");
    setMail("");
    setPhone("");
    setAge("");
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Card sx={{ margin: "2rem 0" }}>
          <Grid container spacing={2}>
            <Grid
              xs={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" padding="1rem">
                Online Yoga Class Registration Form
              </Typography>
            </Grid>
            <Grid xs={4}>
              <img
                src={image}
                alt="yoga"
                loading="lazy"
                height="255px"
                width="100%"
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              autoComplete="on"
              // onSubmit={submitData}
            >
              <Typography>Name</Typography>
              <TextField
                id="outlined-basic"
                label="FirstName"
                type="text"
                required
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="LastName"
                type="text"
                required
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Typography>Age</Typography>
              <TextField
                id="outlined-basic"
                label="Age"
                type="number"
                required
                variant="outlined"
                helperText="Age must be between 18 to 65"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Typography>Email</Typography>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                required
                variant="outlined"
                value={email}
                onChange={(e) => setMail(e.target.value)}
              />
              <Typography>Phone</Typography>
              <TextField
                id="outlined-basic"
                type="tel"
                pattern="[0-9]{10}"
                required
                label="Phone Number"
                name="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
              />
              <br />

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Batches
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={batch}
                  onChange={handleChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="6-7AM"
                    control={<Radio />}
                    label="6-7AM"
                  />
                  <FormControlLabel
                    value="7-8AM"
                    control={<Radio />}
                    label="7-8AM"
                  />
                  <FormControlLabel
                    value="8-9AM"
                    control={<Radio />}
                    label="8-9AM"
                  />
                  <FormControlLabel
                    value="5-6PM"
                    control={<Radio />}
                    label="5-6PM"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Button variant="contained" onClick={handleClickOpen}>
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
      <Dialog
        open={open}
        keepMounted
        PaperComponent={PaperComponent}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Monthly fees for yoga"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Monthly fee for yoga classes is 500/-INR.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={submitData} type="submit">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={`${
            message === "your data has been saved" ? "success" : "error"
          }`}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
