'use strict';
import './webcomponents/RangeSlider/rangeslider.js';
import './webcomponents/ShopArticle/shoparticle.js';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.main = document.querySelector('main');
}

const appendEventlisteners = evt => {
  elements.slider.addEventListener('range-change', loadArticles);
}

const loadArticles = (evt = {detail: {min: 0, max: 3000}}) => {
  const url = new URL('/load_articles', window.location.origin);
  url.searchParams.append('min', evt.detail.min);
  url.searchParams.append('max', evt.detail.max);

  fetch(url)
  .then(res => res.json())
  .then(clearShop())
  .then(renderArticles)
}

const renderArticles = articles => {
  const shop = document.createElement('div');
  shop.className = 'shop';

  articles.forEach(article => {
    const art = document.createElement('shop-article');
    art.name = article.name;
    art.hersteller = article.hersteller;
    art.preis = `${article.preis} ${article.währung}`;
    shop.appendChild(art);
  });

  elements.shop = shop;
  elements.article.appendChild(elements.shop);
}

const clearShop = () => {
  if(elements.shop) elements.shop.remove();
}

const initDocument = () => {
  const article = document.createElement('article');
  article.className = 'center';
  const h1 = document.createElement('h1');
  h1.innerHTML = 'Range-Slider Projekt';
  const slider = document.createElement('range-slider');

  article.appendChild(h1);
  article.appendChild(slider);

  elements.main.appendChild(article);
  elements.article = article;
  elements.slider = slider;
}

const init = () => {
  domMapping();
  initDocument();
  appendEventlisteners();
  loadArticles();
}

// INIT
init();