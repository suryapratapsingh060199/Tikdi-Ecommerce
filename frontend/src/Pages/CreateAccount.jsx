import React, { useState } from "react";
import "./CreateAccount.css";
import TextField from "@mui/material/TextField";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";


import { makeStyles } from "@mui/styles";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const useStyles = makeStyles({
  button: {
    marginRight: 8,
  },
  input: {
    '&::placeholder': {
      color: "white !important"
    },
  },

  root: {
    "& .Mui-disabled .MuiStepIcon-root": { color: 'gray' }
  }
});

function getSteps() {
  return ["Full Name", "E-Mail", "Mobile Number", "Create Password", "User Name"];
}


const BasicForm = () => {
  const { control } = useFormContext();
  const classes = useStyles();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            color="secondary"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            InputProps={{
              classes: { input: classes.input }
            }}
            margin="normal"
            {...field}
            required
          />
        )}
      />
      <Controller
        control={control}
        name="middleName"
        render={({ field }) => (
          <TextField
            id="middle-name"

            variant="outlined"
            placeholder="Enter Your Middle Name"
            fullWidth
            // size="medium"
            margin="normal"
            color="secondary"
            {...field}
            InputProps={{
              classes: { input: classes.input }
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"

            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            // size="medium"
            margin="normal"
            {...field}
            color="secondary"
            required
            InputProps={{
              classes: { input: classes.input }
            }}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const classes = useStyles();
  const { control } = useFormContext();
  const handleEmailChange = (e)=>{
    console.log("Hello")
  }
  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            color="secondary"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            type="email"
            required
            margin="normal"
            onChange={handleEmailChange}
            {...field}
            InputProps={{
              classes: { input: classes.input }
            }}
          />
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const classes = useStyles();
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            color="secondary"
            label="Phone Number"
            type="number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
            required

            inputProps={{
              maxLength: 10,
              classes: { input: classes.input }
            }}
          />
        )}
      />
    </>
  );
};
const PaymentForm = () => {
  const classes = useStyles();
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            id="password"
            label="Password"
            color="secondary"
            variant="outlined"
            type={"password"}
            placeholder="Please Create a strong Password"
            required
            fullWidth
            margin="normal"
            {...field}
            inputProps={{
              maxLength: 10,
              classes: { input: classes.input }
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="cpassword"
        render={({ field }) => (
          <TextField
            id="cpassword"
            label="Confirm password"
            color="secondary"
            variant="outlined"
            type={"password"}
            placeholder="Please Create a strong Password"
            required
            fullWidth
            margin="normal"
            {...field}
            inputProps={{
              maxLength: 10,
              classes: { input: classes.input }
            }}
          />
        )}
      />


    </>
  );
};
const UserNameForm = () => {
  const classes = useStyles();
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="UserName"
        render={({ field }) => (
          <TextField
            id="UserName"
            label="UserName"
            variant="outlined"
            placeholder="Make Your User Name"
            required
            fullWidth
            margin="normal"
            {...field}
            color="secondary"
            inputProps={{
              minLength: 8,
              classes: { input: classes.input }
            }}
          />
        )}
      />
    </>
  );
};


function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    case 4:
      return <UserNameForm />;
    default:
      return "unknown step";
  }
}






export default function CreateAccount() {

  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
      cpassword: "",
      UserName: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [reg_status, set_reg_status] = useState("Please Verify Your Email.")
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();


  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };


  async function send_data(data) {
    let response = await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      let res = await response.json();
      set_reg_status(res['message']);
      console.log(res);
    } else {
      console.error('Error:', response.status);
    }
  }

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      console.log(data);
      send_data(data);
      setActiveStep(activeStep + 1);
    }
    else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };





  return (
    <div className="stepar-parents">
      <div className="stepar">
        <div className="Login-h-l Sign-h-l steparheader">
          <div className='Login_logo' >
            <p>Tikdi<span className='dukan_logo'></span></p>
            <p><ShoppingBagIcon className='Apni_dukan_icon' /></p>
          </div>
        </div>
        <Stepper alternativeLabel activeStep={activeStep} className={classes.root}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index} >
                <StepLabel {...labelProps}  >
                  <Typography variant="caption" color="secondary">
                    {step}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <p >
            {reg_status}
          </p>
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <div className="step-btn">

                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="secondary"
                    variant="contained"
                  >
                    Back
                  </Button>

                  <Link to="/userLogin">Already have an account?</Link>

                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </>
        )}
      </div>
    </div>
  );


}
