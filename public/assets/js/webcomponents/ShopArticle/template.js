'use strict';
const template = document.createElement('div');
template.className = 'shopArticle';

let path = new URL(import.meta.url).pathname;
let index = path.lastIndexOf('/');

path = path.substring(0, index + 1) + 'styles.css';

const elCSS = document.createElement('style');
elCSS.innerHTML = `@import '${path}'`;
template.append(elCSS);

const h2 = document.createElement('h2');
h2.innerHTML = 'Name';
template.appendChild(h2);

const pHersteller = document.createElement('p');
pHersteller.innerHTML = 'Hersteller';
template.appendChild(pHersteller);

const pPreis = document.createElement('p');
pPreis.innerHTML = 'Preis';
template.appendChild(pPreis);

export default template;