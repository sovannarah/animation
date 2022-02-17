import {each} from 'lodash';
import GSAP from "gsap";

export default class Page {
    constructor({id, element, elements}) {
        this.id = id;
        this.selector = element;
        this.selectorChildren = {...elements};
    }

    setElements() {
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

    create() {
        console.log(this.id)
        this.element = document.querySelector(this.selector);
        this.elements = {};
        this.setElements();
    }

    show() {
        return new Promise(resolve => {
            this.animationIn = GSAP.timeline();
            this.animationIn.fromTo(this.element, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                onComplete: resolve
            })
        })
    }

    hide() {
        return new Promise(resolve => {
                this.animationOut = GSAP.timeline();
                this.animationOut.to(this.element, {
                    autoAlpha: 0,
                    onComplete: resolve
                })
            }
        )
    }
}