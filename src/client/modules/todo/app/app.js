import { LightningElement, track } from "lwc";

const URL = "/api/v1/todos";

export default class App extends LightningElement {
  // @track data = [
  //   {"id" : "98237498234", "title":"Initialize Server", "description":"Setup node, express, postgresql to connect with lwc"},
  //   {"id" : "12345678923", "title":"npx lwc app", "description":"modify npx create-lwc-app scripts to handle server initialization"},
  //   {"id" : "98237498234", "title":"Create crud functionality", "description":"create crud functionality for creating items within the application"}
  // ];

  @track data;

  async renderedCallback() {
    const res = await fetch(URL);
    const res2 = await res.json();
    this.data = res2;
  }
}
