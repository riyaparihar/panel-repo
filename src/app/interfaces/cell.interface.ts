import { ACTION_TYPE } from "../enums/action.enum";

export interface Cell{
    action: ACTION_TYPE;
    position: number;
    parameter_id: number;
}


export interface CreatePanelPayload{
    components: Cell[];
}

