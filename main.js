import "/components/ToggleButton/ToggleButton.js";
import "/components/Dropdown/Dropdown.js";
import "/components/DropdawnContainer/DropdawnContainer.js";
import '/components/FormComponent/FormComponent.js'; // Import formularza
import "/components/TextInput/TextInput.js";
import '/components/SubmitButton/SubmitButton.js'; // Importujemy przycisk


const main = () => {
    const myDropdown = document.querySelector("my-dropdown");

    myDropdown.addEventListener("formSubmit", (event) => {
        console.log(event.detail);
        //document.querySelector("html").dataset.theme = event.detail;
    });
};


const fouce = async () => {
    await Promise.allSettled([
        customElements.whenDefined('toggle-button'),
        customElements.whenDefined('my-dropdown'),
        customElements.whenDefined('dropdown-container'),
        customElements.whenDefined('form-component'),
        customElements.whenDefined('text-input'),
        customElements.whenDefined('submit-button')
    ]);

    document.body.classList.add('ready');
}


window.addEventListener("DOMContentLoaded", main);
window.addEventListener("DOMContentLoaded", fouce);
