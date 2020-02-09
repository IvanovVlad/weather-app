function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export async function getLocation() {
    const { coords } = await getCurrentPosition();
    const { latitude, longitude} = coords;
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=98a3e0c499e64ec2900ccda812570281`);
    const data = await response.json();
    return `${data.results[0].components.city}, ${data.results[0].components['ISO_3166-1_alpha-2']}`;
}