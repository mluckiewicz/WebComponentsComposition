const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        @import "/components/Dropdown/Dropdown.css";
    </style>
    <toggle-button variant="secondary"></toggle-button>
    <div part="content">
        <slot></slot>
    </div>
`;

class Dropdown extends HTMLElement {
    static get observedAttributes() {
        return ["placeholder", "open"];
    }

    get placeholder() {
        return this.getAttribute("placeholder") || "";
    }

    get open() {
        return this.hasAttribute("open") && this.getAttribute("open") !== "false";
    }

    set open(value) {
        value === true
            ? this.setAttribute("open", "")
            : this.removeAttribute("open");
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.host.setAttribute("exportparts", "content");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("toggle-button")
            .addEventListener("click", () => { this.toggle() });

        this.addEventListener("formSubmit", (event) => { this.optionClickHandler(event) });
        document.addEventListener("click", (event) => {this.handleClickOutside(event) } );
    }

    optionClickHandler(event) {
        event.stopImmediatePropagation();
        this.selection = event.detail.label;
        this.open = false;

        this.dispatchEvent(
            new CustomEvent("dropdownClosed", {
                detail: event,
            })
        );
        this.render();
    }

    toggle() {
        this.open = !this.open;
        this.render();
    }

    handleClickOutside(event) {
        // Sprawdzenie, czy kliknięcie miało miejsce poza komponentem
        if (!this.contains(event.target) && this.open) {
            this.open = false;
            this.render();
        }
    }

    render() {
        this.shadowRoot.querySelector("toggle-button").innerHTML = /* html */ `
        <span slot="biIcon"><i class="bi bi-x-square-fill"></i></span>
        ${this.selection || this.placeholder}
        <span slot="icon">${this.open ? "▲" : "▼"}</span>
      `;
    }
}

customElements.define("my-dropdown", Dropdown)