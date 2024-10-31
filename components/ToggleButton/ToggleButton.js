import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js'

const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        @import "/components/ToggleButton/ToggleButton.css";
    </style>
    <button class="btn btn-sm btn-primary">
        <slot name="biIcon"></slot>
        <slot></slot>
        <slot name="icon"></slot>
    </button>
`;

class ToogleButton extends HTMLElement {
    static get observedAttributes() {
        return ["variant"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        addGlobalStylesToShadowRoot(this.shadowRoot)
    }
}

customElements.define("toggle-button", ToogleButton)