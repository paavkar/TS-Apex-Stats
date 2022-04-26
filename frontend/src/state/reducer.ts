import { State } from "./state";
import { Entry } from "../types";

export type Action =
  | {
      type: "SET_ENTRY_LIST";
      payload: Entry[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ENTRY_LIST":
      return {
        ...state,
        entries: {
          ...action.payload.reduce(
            (memo, entry) => ({ ...memo, [entry.id]: entry }),
            {}
          ),
          ...state.entries
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
