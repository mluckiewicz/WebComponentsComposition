// Plik: FormComponent.js
import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    @import "/components/FormComponent/FormComponent.css";
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  </style>
  <form>
    <slot></slot>
    <submit-button>Submit</submit-button>
  </form>
`;

class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        addGlobalStylesToShadowRoot(this.shadowRoot);

        this.form = this.shadowRoot.querySelector('form');
    }

    connectedCallback() {
        const submitButton = this.shadowRoot.querySelector('submit-button');

        // Dodajemy nasłuchiwanie kliknięcia w przycisk submit
        submitButton.addEventListener('submit-click', (event) => this.onSubmit(event));
    }

    onSubmit(event) {
        event.preventDefault(); // Zatrzymujemy domyślną akcję formularza (odświeżenie strony)

        // Pobieramy wszystkie pola typu TextInput wewnątrz formularza
        const inputs = this.querySelectorAll('text-input');

        // Sprawdzamy, czy każde pole ma wartość
        let valid = true;
        inputs.forEach((input) => {
            if (!input.value) {
                valid = false;
                input.shadowRoot.querySelector('input').classList.add('is-invalid');
            } else {
                input.shadowRoot.querySelector('input').classList.remove('is-invalid');
            }
        });

        // Jeśli wszystkie pola są prawidłowe, wysyłamy formularz
        if (valid) {
            this.dispatchEvent(
                new CustomEvent('formSubmit', {
                    detail: this.getFormData(inputs),
                    bubbles: true,
                    composed: true,
                })
            );
        } else {
            console.log('Formularz jest nieprawidłowy');
        }
    }

    // Funkcja do zebrania danych z formularza
    getFormData(inputs) {
        const formData = {};
        inputs.forEach((input) => {
            formData[input.getAttribute('name')] = input.value;
        });
        return formData;
    }
}

customElements.define('form-component', FormComponent);
