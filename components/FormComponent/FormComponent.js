// Plik: FormComponent.js
class FormComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        /*
        Form must be in DOM to not break default functionalities
        Transfer all child nodes from host element to an form.
        */
        this.form = document.createElement('form');
        this.form.append(...this.childNodes)

        this.appendChild(this.form)
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