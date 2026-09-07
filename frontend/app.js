const API_URL = 'http://127.0.0.1:8000/api/bookings';

const form = document.getElementById('booking-form');
const bookingsList = document.getElementById('bookings-list');
const errorBlock = document.getElementById('error-message');

$('#booking_time').Zebra_DatePicker({
  format: 'Y-m-d H:i',
  show_clear_date: false
});

async function fetchBookings() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Не удалось получить данные');
    
    const data = await res.json();
    renderList(data);
  } catch (err) {
    bookingsList.innerHTML = '<p class="error">${err.message}</p>'
     }
    
}

function renderList(items) {
    if(!items.length) {
        bookingsList.innerHTML = '<p style="color: #7777;">Пока никто не записался.</p>';
        return;
    }
    bookingsList.innerHTML = items.map(item => {
    const parsedDate = new Date(item.booking_time);
    const dateFormatted = !isNaN(parsedDate) 
      ? parsedDate.toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })
      : item.booking_time;

        return `
            <div class="booking-card">
                <strong>${item.client_name} - ${item.service_name}</strong>
                <small>${dateFormatted}</small>
            </div>
        `;
          
    }).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const client_name = document.getElementById('client_name').value.trim();
  const service_name = document.getElementById('service_name').value.trim();
  const booking_time = document.getElementById('booking_time').value.trim();

  if (!client_name || !service_name || !booking_time) {
    errorBlock.textContent = 'Заполните все поля, включая дату и время';
    errorBlock.style.display = 'block';
    return;
  }

  errorBlock.textContent = '';
  errorBlock.style.display = 'none';

  const payload = {
    client_name,
    service_name,
    booking_time
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Произошла ошибка при сохранении');
    }

    form.reset();
    fetchBookings();
  } catch (err) {
    errorBlock.textContent = err.message;
    errorBlock.style.display = 'block';
  }
});

fetchBookings();