import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductDetails = ({ handlePlaceOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const cartItems = location.state?.cartItems || [];

  const [items, setItems] = useState(
    product
      ? [{ ...product, quantity: 1 }]
      : cartItems.map((item) => ({ ...item, quantity: 1 }))
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price || 0),
    0
  );

  const updateQuantity = (index, increment) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const orderData = {
      customer: { ...data },
      items,
      totalPrice,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3001/orders", orderData);

      setSnackbarMessage("Order placed successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);

      setSnackbarMessage("Error placing order. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  if (!items.length) {
    return <Typography variant="h6">No products found.</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{color:'green',fontFamily:'cursive'}}>
        Order Details
      </Typography>
      <img src="../dairies/placeorder.png" style={{width:'40%'}}/>

      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: "lightblue", width: "70%" }}>
              <CardContent>
                <Typography variant="h5">{item.productName}</Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.productName}
                />
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6">Price: ₹{item.price}</Typography>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(index, -1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(index, 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => removeItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Total Price: ₹{totalPrice}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "50%",
          backgroundColor: "lightgreen",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px auto",
        }}
      >
        <TextField
          label="Name"
          fullWidth
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name must only contain alphabets and spaces",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format. It should not start with a number.",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Address"
          fullWidth
          multiline
          rows={3}
          {...register("address", {
            required: "Address is required",
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Pincode"
          fullWidth
          type="number"
          {...register("pincode", {
            required: "Pincode is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Pincode must be exactly 6 digits.",
            },
          })}
          error={!!errors.pincode}
          helperText={errors.pincode?.message}
          style={{ marginBottom: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Place Order
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
