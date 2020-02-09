const preloader = document.createElement('div');
preloader.className = 'visible';
preloader.id = 'preloader';

document.body.appendChild(preloader)

document.addEventListener('readystatechange', () => {
    if(document.readyState == 'complete') {
        destroyPreloader();
    }
});

export function hidePreloader(){
    preloader.className = 'hidden';
};