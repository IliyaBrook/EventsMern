import {GUEST_WELCOME_MODAL_CLOSE, GUEST_WELCOME_MODAL_OPEN} from "./modalTypes";

const modalsReducerInit = {
    guestWelcomeModalOpen: null,
}
export const modalsReducer = (state = modalsReducerInit, action) => {
    switch (action.type) {
        case GUEST_WELCOME_MODAL_OPEN:
            return {guestWelcomeModalOpen: true }
        case GUEST_WELCOME_MODAL_CLOSE:
            return {guestWelcomeModalOpen: false }
        default:
            return state
    }
}

