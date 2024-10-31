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
window.addEventListener("DOMContentLoaded", main);
