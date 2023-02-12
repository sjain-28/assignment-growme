import React, { useState, useEffect, FC } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, createTheme, ThemeProvider } from '@mui/material';
import { red, orange } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

type dataType = {
   
    name: string;
    email:string;
    phone:string

  };


const Form : FC<dataType>= () => {
     const navigate = useNavigate()

    const theme = createTheme({
        palette: {
            mode: "dark",
            primary: {

                main: red[500],

            },
            secondary: {
                main: orange[500],
            }

        },
    });
    const initialValues = { name: "", email: "", phone: "" };
    const [formValues, setFormValues] = useState<dataType>(getFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }
function getFormValues() {
    const storedValues = localStorage.getItem("form")
    if (!storedValues) {
        return initialValues;

    }
    return JSON.parse(storedValues);
}
    const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // navigate("/users" );
        setFormErrors(validate(formValues));
        setIsSubmit(true);
          navigate("/users" );



    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
                      

        }
        localStorage.setItem('form', JSON.stringify(formValues));
      
           

    }, [formErrors, formValues]);
    const validate = (values) => {
        const errors = {name:"",email:"",phone:""};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
            errors.phone = "Phone is required";
        }
        return errors;
    };
    return (

        <><ThemeProvider theme={theme}>
            <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Contact Us
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid xs={12} item>
                                    <TextField placeholder="Enter name" label="Name" value={formValues.name}
                                        name="name" margin="dense" onChange={handleChange} variant="outlined" fullWidth />
                                </Grid>
                                <Typography variant='subtitle' color="primary">{formErrors.name}</Typography>
                                <Grid item xs={12}>
                                    <TextField type="email" placeholder="Enter email" label="Email" name="email" variant="outlined"
                                        value={formValues.email} margin="dense" onChange={handleChange}
                                        fullWidth />
                                </Grid>
                                <Typography variant='subtitle' color="primary">{formErrors.email}</Typography>
                                <Grid item xs={12}>
                                    <TextField type="tel" name="phone" placeholder="Enter phone number" value={formValues.phone} label="Phone" variant="outlined" onChange={handleChange} margin="dense" fullWidth />
                                </Grid>
                                <Typography variant='subtitle' color="primary">{formErrors.phone}</Typography>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="secondary" fullWidth>Submit</Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </ThemeProvider>
        </>
    );
}

export default Form;