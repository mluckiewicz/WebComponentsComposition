import { addGlobalStylesToShadowRoot } from '../globalstyles/GlobalStyles.js'

export default class Component extends HTMLElement {
    consturctor() {
        this.attachShadow({ mode: 'open' });
        addGlobalStylesToShadowRoot(this.attachShadow)
    }
}