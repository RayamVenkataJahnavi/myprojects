import React from "react";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import styled from "styled-components"; // Import styled-components
import { useNavigate } from "react-router-dom";

const StyledTagline = styled.p`
  font-family: 'Gloria Hallelujah', cursive;
  color: goldenrod;
  font-size: 30px;
  font-weight: 600;
  margin-left: -500px;
  float: left;
  margin-top: 140px;
`;

const HeroContainer = styled.div`
  position: relative;
  padding: 20px;
`;

const LandView = ({ products, onAddToCart }) => {
  const navigate = useNavigate();

  const handleButtonClick = (action, item) => {
    if (action === "addToCart") {
      onAddToCart(item); // Trigger add to cart action
    } else if (action === "buyNow") {
      navigate("/ProductDetails", { state: { product: item } });
    }
  };

  return (
    <section id="images-section" className="hero">
      <HeroContainer id="images-section" className="hero-container">
        <Typography
          style={{
            float: "left",
            fontFamily: "Permanent Marker, serif",
            color: "green",
            fontWeight: "500px",
            fontSize: "100px",
            marginLeft: "40px",
          }}
        >
          Dairy Farm
        </Typography>
        <StyledTagline>Nature’s Goodness in Every Drop.</StyledTagline>
        <img
          src="../dairies/cartoon-kid-milking-a-cow-vector.jpg"
          height={"300px"}
          width={"500px"}
          style={{ float: "right" }}
        />
        <Grid container spacing={8} sx={{ padding: "30px",backgroundColor:'goldenrod' }}>
          {products.map((item) => (
            <Grid item xs={6} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.productName}
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{item.price}
                  </Typography>
                  <button
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      cursor: "pointer",
                      float: "left",
                      transition: "transform 0.2s ease",
                    }}
                    onClick={() => handleButtonClick("addToCart", item)} // Add to cart
                    onMouseDown={(e) => e.target.style.transform = "scale(1.05)"} // Scale down on click
                    onMouseUp={(e) => e.target.style.transform = "scale(1)"} // Scale back up on release
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      backgroundColor: "goldenrod",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      cursor: "pointer",
                      float: "right",
                      transition: "transform 0.2s ease",
                    }}
                    onClick={() => handleButtonClick("buyNow", item)} // Buy Now
                    onMouseDown={(e) => e.target.style.transform = "scale(1.06)"} // Scale down on click
                    onMouseUp={(e) => e.target.style.transform = "scale(1)"} // Scale back up on release
                  >
                    Buy Now
                  </button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </HeroContainer>
      <hr />
    </section>
  );
};

export default LandView;
