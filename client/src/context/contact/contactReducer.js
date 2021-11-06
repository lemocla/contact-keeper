import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case DELETE_CONTACT:
            return{
                ...state,
                //filter contact to be deleted from uk - only display contact not this id
                contacts: state.contacts.filter(contact => contact.id !== action.payload )
            };
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }
        default:
            return state;
    }
}