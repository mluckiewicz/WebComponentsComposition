// Plik: FormComponent.js
import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js';

/*const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import "/components/FormComponent/FormComponent.css";
    form {
      display: flex;
      flex-direction: column;
      gap: 10rem;
    }
  </style>
  <form>
    <slot></slot>
    <button type="submit" class="btn btn-sm btn-primary">Submit</button>
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
        // Dodajemy nasłuchiwanie kliknięcia w przycisk submit
        this.form.addEventListener('submit', (event) => this.onSubmit(event));
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

*/

class FormComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.form = document.createElement('form');
        while (this.firstChild) {
            this.form.appendChild(this.firstChild);
        }

        this.appendChild(this.form)
    }
}


customElements.define('form-component', FormComponent);