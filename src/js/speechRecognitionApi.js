const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
if (window.currentLanguage === 'en') {
    recognition.lang = 'en-US';
} else {
    recognition.lang = 'ru-RU'
}

recognition.continuous = true;
recognition.interimResults = true;

document.getElementById('voice').addEventListener('click', () => recognition.start());

document.getElementById('voice').addEventListener('dblclick', () => recognition.stop());

recognition.onerror = function (event) {
    console.error(event);
};

recognition.onresult = function (event) {
    recognition.stop();
    
    let final_transcript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        }
    }

    document.querySelector('#search-field').value = final_transcript;
};