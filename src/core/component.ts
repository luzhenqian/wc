import { genComponentClass } from "../compiler/genCode/genComponent"

export interface ComponentOptions {
  props?: Array<string> | object,
  data?: Function,
  methods?: object,
  template?: string
}

export function component(name: string, options: ComponentOptions) {
  customElements.define(name, genComponentClass(options));
}