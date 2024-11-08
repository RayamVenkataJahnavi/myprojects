// Write JS function to reserve a table, persist the data using Axios API
// reserve.js
function scrollToReservation() {
  const reservationContainer = document.getElementById('reservationContainer');
  if (reservationContainer) {
      reservationContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('Phone').value;
    const date = document.getElementById('Date').value;
    const time = document.getElementById('time').value;
    const persons = document.getElementById('persons').value;
  
    // Reservation data object
    const reservationDetails = { name, email, phone, date, time, persons };
    if (!name || !email || !phone || !date || !time) {
        alert("Please fill out all required fields.");
        return;
      }
    // Save reservation using Axios with .then()
    axios.post('http://localhost:3001/reservations', reservationDetails)
      .then(function() {
        // Display success message
        alert( 'You have successfully booked a table!');
        //document.querySelector('form').appendChild(successMessage);
      })
      .catch(function(error) {
        console.error('Failed to save reservation:', error);
      });
  });
 
