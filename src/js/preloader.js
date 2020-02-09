const preloader = document.createElement('div');
preloader.className = 'visible';
preloader.id = 'preloader';

document.body.appendChild(preloader)

export function hidePreloader(){
    preloader.className = 'hidden';
};