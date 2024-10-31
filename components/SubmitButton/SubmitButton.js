// Plik: SubmitButton.js
import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    @import "/components/SubmitButton/SubmitButton.css";
  </style>
  <button class="btn btn-sm btn-primary">
    <slot></slot>
  </button>
`;

class SubmitButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        addGlobalStylesToShadowRoot(this.shadowRoot);
    }

    connectedCallback() {
        this.button = this.shadowRoot.querySelector('button');
        this.button.addEventListener('click', () => this.handleClick());
    }

    handleClick() {
        this.dispatchEvent(new Event('submit-click', { bubbles: true, composed: true }));
    }

    set disabled(value) {
        this.button.disabled = value;
    }
}

customElements.define('submit-button', SubmitButton);
