// Plik: TextInput.js
import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js';

const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        @import "/components/TextInput/TextInput.css";
    </style>
    <div>
        <label class="form-label" for="textInput">
            <slot name="label"></slot>
        </label>
        <input type="text" id="textInput" class="form-control form-control-sm" placeholder="">
    </div>
`;

class TextInput extends HTMLElement {
    static get observedAttributes() {
        return ["placeholder", "value"];
    }

    get value() {
        return this.shadowRoot.querySelector("input").value;
    }

    set value(val) {
        this.shadowRoot.querySelector("input").value = val;
    }

    get placeholder() {
        return this.getAttribute("placeholder");
    }

    set placeholder(val) {
        this.setAttribute("placeholder", val);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        addGlobalStylesToShadowRoot(this.shadowRoot);

        this.input = this.shadowRoot.querySelector("input");
    }

    connectedCallback() {
        this.input.addEventListener('change', this);
    }

    disconnectedCallback() {
        this.input.removeEventListener('change', this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "placeholder") {
            this.shadowRoot.querySelector("input").setAttribute("placeholder", newValue);
        }
    }

    handleEvent(event) {
        this[`on${event.type}`](event);
    }

    onchange(event) {
        this.dispatchEvent(
            new CustomEvent("inputChange", {
                detail: event.target.value,
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
    }
}

customElements.define("text-input", TextInput);
