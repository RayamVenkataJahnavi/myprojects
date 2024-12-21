import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { lightBlue } from '@mui/material/colors';

const OrderRequestsView = () => {
  const navigate = useNavigate();
  const [orderRequests, setOrderRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      navigate('/login');
    } else {
      // Fetch orders from the json-server endpoint
      axios.get('http://localhost:3001/orders')  // Endpoint for orders in json-server
        .then((response) => {
          setOrderRequests(response.data); // Set the response data
          setLoading(false); // Set loading state to false
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false); // Stop loading on error
        });
    }
  }, [navigate, isAuthenticated]);

  return (
    <div style={{ padding: '20px',backgroundColor:'lightBlue' }}>
      {!isAuthenticated && <Typography variant="h6">You need to login first!</Typography>}
      {loading ? (
        <Typography variant="h6">Loading order requests...</Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom style={{color:'goldenrod',fontFamily:'cursive'}}>
            Previous Orders
          </Typography>
          {orderRequests.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
  {orderRequests.map((order) => {
    if (order.items && Array.isArray(order.items)) {
      // If order has an items array
      return order.items.map((item, index) => (
        <TableRow key={`${order.id}-${index}`}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{item.productName}</TableCell>
          <TableCell>{item.quantity || "N/A"}</TableCell>         
          <TableCell>{order.customer?.name || "Unknown"}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
          <TableCell>{order.customer?.address || "N/A"}</TableCell>

        </TableRow>
      ));
    } else {
      // Single product orders
      return (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.productName}</TableCell>
          <TableCell>{order.quantity || "N/A"}</TableCell>
          <TableCell>{order.firstName || order.customer?.name || "Unknown"}</TableCell>
          <TableCell>{order.price}</TableCell>
          <TableCell>{new Date(order.deliveryDate || order.date).toLocaleDateString()}</TableCell>
          <TableCell>{order.address || order.customer?.address || "N/A"}</TableCell>
        </TableRow>
      );
    }
  })}
</TableBody>

              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h6">No previous orders found.</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default OrderRequestsView;
