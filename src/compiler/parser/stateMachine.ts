import { StateType } from "./templateParser"
export function stateMachine(char: string, currentState: StateType): StateType {
  /**
   * tagOpenStart attrs tagOpenEnd tagEnd textNode notes
   * 解析 <z-u :key="1"></z-u>
   */

  /**
   * <div name="a">hello</div>
   * (init) -> '<div' -> tagOpenStart
   * (tagOpenStart) -> ' ' -> attrsKey
   * (attrsKey) ->  'name=' -> attrsValue
   * (attrsValue) -> 'a' -> tagOpenEnd
   * (tagOpenEnd) -> '>' -> textNode || tagEnd
   * (textNode) -> 'hello' -> tagEnd
   * (tagEnd) -> '</div>' -> (end)
   */
  if (char === "<") {
    if (currentState === StateType.Init) {
      return StateType.TagOpenStart;
    }
    if (currentState === StateType.TextNode) {
      return StateType.TagOpenStart;
    }
  } else if (char === ">") {
    if (currentState === StateType.TagOpenStart ||
      currentState === StateType.AttrsValue ||
      currentState === StateType.AttrsKey) {
      return StateType.TagOpenEnd;
    }
    if (currentState === StateType.TagOpenEnd) {
      return StateType.TextNode;
    }
    if (currentState === StateType.TagEnd) {
      return StateType.End;
    }
  } else if (/[a-z|A-Z|0-9]/.test(char)) {
    if (currentState === StateType.TagOpenStart) {
      return StateType.TagOpenStart;
    }
    if (currentState === StateType.AttrsKey) {
      return currentState;
    }
    if (currentState === StateType.AttrsValue) {
      return currentState;
    }
    if (currentState === StateType.TextNode) {
      return currentState;
    }
    if (currentState === StateType.TagOpenEnd) {
      return StateType.TagOpenEnd;
    }
    if (currentState === StateType.TagEnd) {
      return StateType.TagEnd;
    }
  } else if (char === " ") {
    return StateType.AttrsKey;
  } else if (char === "=") {
    if (currentState === StateType.AttrsKey) {
      return StateType.AttrsKey;
    }
  } else if (char === "\"") {
    if (currentState === StateType.AttrsKey) {
      return StateType.AttrsValue;
    }
    if (currentState === StateType.AttrsValue) {
      return StateType.TagOpenEnd;
    }
  } else if (char === "\/") {
    if (currentState === StateType.TagEnd) {
      return StateType.TagEnd;
    }
    if (currentState === StateType.TagOpenStart) {
      return StateType.TagOpenEnd;
    }
  }
  return StateType.End;
}