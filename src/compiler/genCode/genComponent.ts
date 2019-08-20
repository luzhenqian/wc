import { ComponentOptions } from '../../core/component'
import { templateParser } from "../parser/templateParser"

export function genComponentClass(option: ComponentOptions) {
  return class Componetns extends HTMLElement {
    private template = document.createElement('template');
    private shadow = this.attachShadow({ mode: "closed" })
    constructor() {
      super();
      this.init();
    }
    init() {
      option.data && this.initData();
      option.props && this.initProps();
      option.methods && this.initMethods();
      option.template && this.initTemplate();
    }
    initData() { }
    initProps() { }
    initMethods() { }
    initTemplate() {
      if (option.template === undefined) return;
      this.template.innerHTML = templateParser(option.template);
      this.shadow.append(this.template.content.cloneNode(true));
    }
  }
}