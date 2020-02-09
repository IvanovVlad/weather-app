const imageAPIKey = '563492ad6f91700001000001e5099a744d6d4faba7664ce972e647cb';

function getImage(keyWords) {
    return fetch(`https://api.pexels.com/v1/search?query=${keyWords.toString()}&per_page=10&page=1`, {
        headers: {
            'Authorization': imageAPIKey
        }
    })
        .then(e => {
            if (e.ok === true && e.status >= 200 && e.status < 300) return e.json()
            throw e;
        })
        .catch(err => console.log("Error status: " + err.status));
}

export function renderImage() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getImage(weatherDescription).then(img => {
        const image = new Image();
        const photoJSON = img.photos[getRandomInt(10)];
        image.src = photoJSON.src.portrait;
        image.onload = function () {
            const background = document.querySelector('.background');
            background.style.backgroundImage = `url('${this.src}')`;
            background.style.backgroundSize = 'cover';
            background.innerText = "@" + photoJSON.photographer;
        };
    });
}