import React from "react";
import { Typography, Grid, Card, CardContent, Button, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderView = ({ cartItems }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Permanent Marker, serif",color: "darkgreen" }}
      >
        {cartItems.length > 0 ? "Items in your cart! Add more or checkout." : "oops ! Your cart is empty"}
      </Typography>

      {cartItems.length > 0 ? (
        <img
          src="../dairies/girlimage.jpg"
          alt="Cart has items"
          style={{ width: "30%", height: "30%",marginTop:'-40px',marginBottom:'60px',float:'right' }}
        />
      ) : (
        <img
          src="../dairies/empty-cart-flat-illustration-concept-vector.jpg"
          alt="Cart is empty"
          style={{ width: "40%", height: "40%", marginBottom: "20px" }}
        />
      )}

      <Grid container spacing={4}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ backgroundColor: "lightblue",marginTop:'-90px' }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.productName}
                    sx={{ height: 200 }}
                  />
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" style={{marginLeft:'480px',color:'green'}}>
            Add items to your cart to see them here.
          </Typography>
        )}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/ProductDetails", { state: { cartItems } })}
        disabled={cartItems.length === 0}
      >
        Place Order
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")}
        style={{ marginLeft: "10px", marginTop: "20px" }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default OrderView;
