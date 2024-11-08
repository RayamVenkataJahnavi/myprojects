// Function to load order.html content into the orderFormContaine
function loadOrderForm(){
    fetch('order.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load order form');
            return response.text();
        })
        .then(html => {
            document.getElementById('orderFormContainer').innerHTML = html;
            document.getElementById('orderFormContainer').style.display = 'block';
        })
        .catch(error => console.error('Error loading order form:', error));
}

// Function to add new order item fields dynamically
function addOrderItem() {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('form-group');
    itemContainer.innerHTML = `
        <label for="categoryName">Category Name:</label>
        <input type="text" id="categoryName" placeholder="Category Name" class="form-control item-category"  required style="width:40%";>
        
        <label for="itemName">Item Name:</label>
        <input type="text" id="itemName" placeholder="Item Name" class="form-control item-name" required style="width:40%";>>
        
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" placeholder="Quantity" class="form-control item-quantity" required min="1" value="1" style="width:40%";>>
        
        <label for="price">Price (INR):</label>
        <input type="number" id="price" placeholder="Price (INR)" class="form-control item-price" required min="0" step="0.01" style="width:40%";>>
        
        <label>Subtotal:</label>
        <span class="subtotal">INR <span class="subtotal-value">0.00</span></span>    
    `;
    
    // Update subtotal when quantity or price changes
    const quantityInput = itemContainer.querySelector('.item-quantity');
    const priceInput = itemContainer.querySelector('.item-price');
    const subtotalValue = itemContainer.querySelector('.subtotal-value');
    
    const updateSubtotal = () => {
        // Get the quantity from the input, or set to 0 if empty or invalid
        const quantity = parseInt(quantityInput.value) || 0;
        // Get the price from the input, or set to 0 if empty or invalid
        const price = parseFloat(priceInput.value) || 0;
        // Calculate the subtotal by multiplying quantity and price
        const subtotal = quantity * price;
        // Display the subtotal, rounded to two decimal places
        subtotalValue.textContent = subtotal.toFixed(2);
    };
    quantityInput.addEventListener('input', updateSubtotal);
    priceInput.addEventListener('input', updateSubtotal);
    document.getElementById('orderItemsContainer').appendChild(itemContainer);
}
// Function to handle order submission
function placeOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const orderDate = document.getElementById('orderDate').value;

    // Gather all items and calculate the total amount
    const items = [];
    let totalAmount = 0;
    document.querySelectorAll('#orderItemsContainer .form-group').forEach(item => {
        const itemName = item.querySelector('.item-name').value;
        const quantity = parseInt(item.querySelector('.item-quantity').value, 10);
        const price = parseFloat(item.querySelector('.item-price').value);

        items.push({ itemName, quantity, price });
        totalAmount += quantity * price;
    });

    // Display the total amount in the form
    document.getElementById('totalAmount').value = totalAmount;

    // Check for soft drink eligibility
    let softDrinkMessage = '';
    if (totalAmount > 1100) {
        softDrinkMessage = 'You are eligible for a free soft drink with your order!';
    }

    // Form data to send
    const orderData = {
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        orderDate,
        items,
        totalAmount
    };

    // Send data to json-server
    axios.post('http://localhost:3002/order', orderData)
        .then(response => {
            alert(`Order placed successfully! Total Amount: INR ${totalAmount}. ${softDrinkMessage}`);
            document.getElementById('dynamicOrderForm').reset(); // Reset the form after submission
            
            // Hide the form container after successful submission
            document.getElementById('orderFormContainer').style.display = 'none';
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        });
}

// Event listener to load and show the order form on button click
document.getElementById('orderLink').addEventListener('click', function() {
    const orderFormContainer = document.getElementById('orderFormContainer');
    orderFormContainer.style.display = orderFormContainer.style.display === 'block' ? 'none' : 'block';

    if (orderFormContainer.style.display === 'block') {
        fetch('order.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load menu');
                return response.text();
            })
            .then(html => {
                orderFormContainer.innerHTML = html;
                loadOrderForm(); // Fetch and display menu data
            })
            .catch(error => console.error('Error loading menu:', error));
    }
});

