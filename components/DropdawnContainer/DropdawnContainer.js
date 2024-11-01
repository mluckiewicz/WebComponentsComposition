import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js'

const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        @import "/components/DropdawnContainer/DropdawnContainer.css";
    </style>
    <div part="container" class="card">
        <div class="card-body p-2">
            <slot></slot>
        </div>
    </div>
`;


class DropdawnContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.host.setAttribute("exportparts", "container, container1");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        addGlobalStylesToShadowRoot(this.shadowRoot)
    }
}

customElements.define("dropdown-container", DropdawnContainer)