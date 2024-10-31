const template = document.createElement("template");
template.innerHTML = /* html */ `
    <style>
        @import "/components/DropdownOption/DropdownOption.css";
    </style>
    <div part="container">
        <slot></slot>
        <slot name="content"></slot>
    </div>
`;


class DropdownOption extends HTMLElement {
    static get observedAttributes() {
        return ["value"];
    }

    get value() {
        return this.getAttribute("value");
    }

    get label() {
        const slot = this.shadowRoot.querySelectorAll("slot")[0];
        return slot.assignedNodes().at(0).textContent;
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.host.setAttribute("exportparts", "container");
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.addEventListener("click", (event) => {this.clickHandler(event)});
    }

    clickHandler() {
        this.dispatchEvent(
            new CustomEvent("myDropdownOptionClick", {
                detail: {
                    label: this.label,
                    value: this.value,
                },
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
    }
}

customElements.define("my-dropdown-option", DropdownOption)