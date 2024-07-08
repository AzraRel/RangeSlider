'use strict';
import template from './template.js';

class ShopArticle extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'});
    this.root.append(template.cloneNode(true));
  }

  static get observedAttributes() {
    return ['name', 'hersteller', 'preis'];
  }

  get name() {
    this.getAttribute('name');
  }
  set name(val) {
    this.setAttribute('name', val);
  }

  get hersteller() {
    this.getAttribute('hersteller');
  }
  set hersteller(val) {
    this.setAttribute('hersteller', val);
  }

  get preis() {
    this.getAttribute('preis');
  }
  set preis(val) {
    this.setAttribute('preis', val);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName == 'name') {
      let name = this.root.querySelector('h2');
      name.innerHTML = newVal;
    } else if (attrName == 'hersteller') {
      let hersteller = this.root.querySelector('p:nth-of-type(1)');
      hersteller.innerHTML = newVal;
    } else if (attrName == 'preis') {
      let preis = this.root.querySelector('p:nth-of-type(2)');
      preis.innerHTML = newVal;
    }
  }
}

customElements.define('shop-article', ShopArticle);