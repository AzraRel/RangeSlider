'use strict';
import template from './template.js';

class RangeSlider extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'});
    this.root.append(template.cloneNode(true));
  }

  connectedCallback() {
    // Die Beiden Range Inputs
    const sliders = this.shadowRoot.querySelectorAll('.range-slider input');
    // Sichtbarer Progress-Balken
    const progress = this.shadowRoot.querySelector('.range-slider .progress');
    // Abstand den Min und Max mindestens haben müssen
    let gap = 50;
    // Number Input Felder zur Anzeige der Min und Max Werte
    const inputValue = this.shadowRoot.querySelectorAll('.numberVal input');

    let min = parseInt(sliders[0].value);
    let max = parseInt(sliders[1].value);
    progress.style.left = `${(min / sliders[0].max) * 100}%`;
    progress.style.right = `${100 - (max / sliders[1].max) * 100}%`;
    inputValue[0].value = min;
    inputValue[1].value = max;

    sliders.forEach(input => {
      input.addEventListener('input', x => {
        let min = parseInt(sliders[0].value);
        let max = parseInt(sliders[1].value);

        if (min >= max) {
          if (x.target.className === 'range-min') {
            min = max - gap;
            sliders[0].value = min;
          } else {
            max = min + gap;
            sliders[1].value = max;
          }
        }
        
        progress.style.left = `${(min / sliders[0].max) * 100}%`;
        progress.style.right = `${100 - (max / sliders[1].max) * 100}%`;
        inputValue[0].value = min;
        inputValue[1].value = max;
      })

      input.addEventListener('change', () => {
        let min = parseInt(sliders[0].value);
        let max = parseInt(sliders[1].value);

        const myEvent = new CustomEvent('range-change', {
          detail: {
            min: min,
            max: max
          }
        });

        this.dispatchEvent(myEvent);

      });
    })
  }
}

customElements.define('range-slider', RangeSlider);