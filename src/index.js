import each from 'lodash/each';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

class App {
    constructor() {
        this.content = document.querySelector('.content');
        this.setTemplate();
        this.addLinkListeners();
        this.createPages();
    }

    mountPage() {
        this.page.create();
        this.page.show();
    }

    setPage() {
        this.page = this.pages[this.template];
    }

    createPages() {
        this.home = new Home();
        this.about = new About();
        this.pages = {
            '': this.home,
            '/': this.home,
            '/about': this.about
        }
        this.setPage();
        console.log(this.template, this.page)
        this.mountPage();
    }

    setTemplate() {
        this.template = window.location.pathname;
    }

    getNewDivContent(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.querySelector('.content');
    }

    changeContent(divContent) {
        this.content.innerHTML = divContent.innerHTML;
        const newAttribute = divContent.getAttribute('data-template');
        this.content.setAttribute('data-template', newAttribute);
    }


    async changeLink({url}) {
        const request = await window.fetch(url);
        if (request.status === 200) {
            window.history.pushState({}, '', url);
            const html = await request.text();
            const newDivContent = this.getNewDivContent(html);
            this.changeContent(newDivContent);
            this.setTemplate();
            this.setPage();
            this.mountPage();
        } else {
            console.log('error loading page');
        }
    }

    addLinkListeners() {
        const links = document.querySelectorAll('a');
        each(links, link => {
            link.onclick = event => {
                event.preventDefault();
                this.changeLink({
                    url: link.href
                })
            }
        })
    }
}

new App();