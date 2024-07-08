'use strict';
const template = document.createElement('div');
template.className = 'slider';

let path = new URL(import.meta.url).pathname;
let index = path.lastIndexOf('/');

path = path.substring(0, index + 1) + 'styles.css';

const elCSS = document.createElement('style');
elCSS.innerHTML = `@import "${path}"`;
template.append(elCSS);

// 1. Number Feld für den Min-Wert
const minVal = document.createElement('div');
minVal.className = 'min-value numberVal';

const minInput = document.createElement('input')
minInput.type = 'number';
minInput.value = 0;
minInput.disabled = true;

minVal.appendChild(minInput);
template.append(minVal);

// Range-Input
const slider = document.createElement('div');
slider.className = 'range-slider';

// Progress Bar zwischen den Slider-Thumbs
const progress = document.createElement('div');
progress.className = 'progress';
slider.appendChild(progress);

// Die beiden Slider
const minRange = document.createElement('input');
minRange.type = 'range';
minRange.className = 'range-min';
minRange.min = 0;
minRange.max = 3000;
minRange.value = 0;
minRange.step = 1;
const maxRange = document.createElement('input');
maxRange.type = 'range';
maxRange.className = 'range-max';
maxRange.min = 0;
maxRange.max = 3000;
maxRange.value = 3000;
maxRange.step = 1;

slider.appendChild(minRange);
slider.appendChild(maxRange);
template.append(slider);

// 2. Number Feld für den Max-Wert
const maxVal = document.createElement('div');
maxVal.className = 'max-value numberVal';

const maxInput = document.createElement('input')
maxInput.type = 'number';
maxInput.value = 3000;
maxInput.disabled = true;

maxVal.appendChild(maxInput);
template.append(maxVal);

export default template;
