import { createElement } from "lwc";
import App from "todo/app";

const app = createElement("todo-app", { is: App });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector("#main").appendChild(app);
