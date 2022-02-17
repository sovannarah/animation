import {each} from 'lodash';

export function setElements() {
    each(this.selectorChildren, (selector, key) => {
        if(selector instanceof  window.HTMLElement || selector instanceof  window.NodeList) {
            this.elements[key] = selector;
        } else if (Array.isArray(selector)) {
            this.elements[key] = selector;
        } else {
            this.elements[key] = this.element.querySelectorAll(selector);

            if (this.elements[key].length === 0) {
                this.elements[key] = null;
            } else if (this.elements[key].length === 1) {
                this.elements[key] = document.querySelector(selector);
            }
        }
    })
}