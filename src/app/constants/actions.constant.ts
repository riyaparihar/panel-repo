import { ACTION_TYPE } from "../enums/action.enum";

export const ACTION_SELECT_OPTIONS = [
    {
        value: ACTION_TYPE.DISPLAY_VALUE,
        label: " Display value",
    },
    {
        value: ACTION_TYPE.INCREMENT_DECREMENT_VALUE,
        label: "Increment or decrement value",
    },
    {
        value: ACTION_TYPE.SET_VALUE,
        label: " Set value",
    }
]