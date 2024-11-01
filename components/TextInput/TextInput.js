// Plik: TextInput.js
import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js';


class TextInput extends HTMLElement {

    static formAssociated = true;
    static get observedAttributes() {
        return ["placeholder", "value"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.internals_ = this.attachInternals();
        addGlobalStylesToShadowRoot(this.shadowRoot);
    }

    get value() { return this.input.value; }
    set value(val) {
        this.input.value = val;
        this.internals_.setFormValue(value);
    }

    get placeholder() { return this.getAttribute("placeholder"); }
    set placeholder(val) { this.setAttribute("placeholder", val); }

    get form() { return this.internals_.form; }
    get name() { return this.getAttribute('name'); }
    get type() { return this.internals_; }
    get validity() { return this.internals_.validity; }
    get validationMessage() { return this.internals_.validationMessage; }
    get willValidate() { return this.internals_.willValidate; }

    connectedCallback() {
        this.render();
        this.input.addEventListener('change', this);
        this.input.addEventListener('input', this);
    }

    disconnectedCallback() {
        this.input.removeEventListener('change', this);
        this.input.addEventListener('input', this);
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = /* html */ `
            <style>
                @import "/components/TextInput/TextInput.css";
            </style>
            <div>
                <label class="form-label" for="textInput">
                    <slot name="label"></slot>
                </label>
                <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="${this.placeholder}"
                >
            </div>
        `;


        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.input = this.shadowRoot.querySelector("input");
    }

    formAssociatedCallback(form) {
        console.log('form associated:',  this.internals_.form);
    }

    handleEvent(event) {
        this[`on${event.type}`](event);
    }

    onchange(event) {
        this.onUpdateValue()

        this.dispatchEvent(
            new CustomEvent("inputChange", {
                detail: event.target.value,
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
    }

    oninput(event) {
        console.log(event)
    }

    onUpdateValue() {
        if (this.value == '') {
            this.internals_.setValidity({ customError: true }, 'Value cannot be negative.');

        }
        else {
            this.internals_.setValidity({});
        }
        this.internals_.setFormValue(this.value);
    }
}

customElements.define("text-input", TextInput);
