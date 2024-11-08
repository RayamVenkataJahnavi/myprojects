
function fetchMenu() {
    return axios.get('http://localhost:3000/menu')
        .then(response => {
            const menuItems = response.data;
            if ( Array.isArray(menuItems)){
                displayMenu(menuItems);
                return menuItems; // Return menuItems for filtering
            } else {
                throw new Error('Menu items not found in response');
            }
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
        });
}

// Function to filter the menu items based on the selected category
function filterMenu() {
    const selectedCategory = document.getElementById('category').value;
    fetchMenu().then(menuItems => {
        if (!menuItems || !Array.isArray(menuItems)) {
            console.error('No menu items found to filter');
            return; // Exit if menuItems is undefined
        }
        //using ternary operator
        const filteredItems = selectedCategory === 'all' ? menuItems : menuItems.filter(item => item.category === selectedCategory);
        displayMenu(filteredItems);
    }).catch(error => {
        console.error('Error filtering menu:', error);
    });
}

// Function to display the menu items in a table format
function displayMenu(menuItems) {
    if (!Array.isArray(menuItems)) {
        console.error('No valid menu items to display');
        return; // Exit the function if menuItems is not valid
    }

    const tableBody = document.querySelector('#menuTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.cuisine}</td>
            <td>${item.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Toggle menu display when the Menu link is clicked
document.getElementById('menuLink').addEventListener('click', function() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = menuContainer.style.display === 'block' ? 'none' : 'block';
    if (menuContainer.style.display === 'block') {
        fetch('menu.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load menu');
                return response.text();
            })
            .then(html => {
                menuContainer.innerHTML = html;
                fetchMenu(); // Fetch and display menu data
            })
            .catch(error => console.error('Error loading menu:', error));
    }
});
