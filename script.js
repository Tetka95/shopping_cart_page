const select = document.getElementById('country');

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));

document.getElementById('toggle-shipping').addEventListener('click', function() {
    const shippingDetails = document.getElementById('shipping-details');
    if (shippingDetails.style.display === 'none' || !shippingDetails.style.display) {
        shippingDetails.style.display = 'block';
    } else {
        shippingDetails.style.display = 'none';
    }
});


const shippingCost = 5.99; // Fiksni trošak dostave i poreza u eurima

function calculateTotal() {
    const rows = document.querySelectorAll('.product-table tbody tr');
    let total = 0;

    rows.forEach(row => {
        const price = parseFloat(row.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(row.querySelector('.quantity').value);
        
        const rowTotal = price * quantity;
        total += rowTotal;

        row.querySelector('.product-total').textContent = `${rowTotal.toFixed(2)} €`;
    });

    document.getElementById('total-price').textContent = `${total.toFixed(2)} €`;

    
    const postalCode = document.getElementById('postcode').value;
    let grandTotal = total;

    if (postalCode) {
        document.getElementById('shipping-cost').textContent = `${shippingCost.toFixed(2)} €`;
        grandTotal += shippingCost;
    } else {
        document.getElementById('shipping-cost').textContent = "0 €";
    }

   document.getElementById('grand-total').textContent = `${grandTotal.toFixed(2)} €`;
}


document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', calculateTotal);
});


document.getElementById('postcode').addEventListener('input', calculateTotal);
calculateTotal();