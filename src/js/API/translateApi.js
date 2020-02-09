const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const apiKey = 'trnsl.1.1.20200209T182753Z.29dbba5b530efa2d.81709866a3ded403ae76f65aafceaae4a6b5938e';

export async function translate(text, language) {
    try {
        const ok = await fetch(url, {
            method: 'POST',
            body: `key=${apiKey}&lang=${language}&text=${text}`,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const json = await ok.json();
        return json.text[0];
    } catch (e) {
        alert('Translate error. ' + e);
    }
}
