import EventEmitter from 'events';
import each from 'lodash/each';

export default class Component extends EventEmitter {

    constructor({element, elements}) {
        super();
        this.selector = element;
        this.selectorChildren = {...elements};

        this.create();
        this.addEventListeners();

    }

    create() {
        if (this.selector instanceof window.HTMLElement) {
            this.element = this.selector;
        } else {
            this.element = document.querySelector(this.selector);
        }

        this.elements = {};
        each(this.selectorChildren, (selector, key) => {
            if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
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

    addEventListeners() {

    }

    removeEventListeners() {

    }
}
