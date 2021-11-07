import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props =>{
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'personal'                
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'                
            }
        ],
        current: null
    };

    //Reducer - dispatch allow to 
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Actions

    //Add contact
    const addContact = contact =>{
        contact.id = uuidv4();
        dispatch({ 
            type: ADD_CONTACT, 
            payload: contact
        })
    }

    //Delete contact
    const deleteContact = id =>{
        dispatch({ 
            type: DELETE_CONTACT, 
            payload: id
        })
    }   

    //Set current contact
    const setCurrent = contact =>{
        dispatch({ 
            type: SET_CURRENT, 
            payload: contact
        })
    }   

    //Clear current contact
    const clearCurrent = () =>{
        dispatch({ 
            type: CLEAR_CURRENT
        })
    }         

    //Update contact
    const updateContact = contact =>{
        dispatch({ 
            type: UPDATE_CONTACT, 
            payload: contact
        })
    }    

    //Filter contacts
    //Clear filter

    //Return provider
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;