const default_photo_url = './NLvacation.jpeg';

const fetchPhoto = (query) => {
    const apiKey = 'dXog8yhrjZjHYHkL05cIXutVPljh5pxYYAzAuWK0nxk';
    const url = `https://api.unsplash.com/photos/random?query=${query}`;
    return fetch(url, {
        headers: { Authorization: `Client-ID ${apiKey}` }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.urls && data.urls.small) {
            return data.urls.small;
        } else {
            throw new Error('No Photo Found');
        }
    })
    .catch(error => {
        console.error('Cannot fetch photo:', error);
        return default_photo_url;
    });
};

export default fetchPhoto;