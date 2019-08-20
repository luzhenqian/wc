import { stateMachine } from './stateMachine'

export function templateParser(template: string) {
  let input = getInput(template);
  let state = StateType.Init;
  let char = input.next();
  while (!char.done) {
    state = stateMachine(char.value, state);
    console.table(char.value, StateType);
    char = input.next();
  }
  return template;
}

export enum StateType {
  Init,
  TagOpenStart,
  AttrsKey,
  AttrsValue,
  TagOpenEnd,
  TextNode,
  TagEnd,
  End
}

function* getInput(template: string): IterableIterator<string> {
  let i = 0;
  while (i < template.length) {
    yield template.substr(i++, 1);
  }
}