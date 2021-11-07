import React, { useReducer } from 'react';
import axios from 'axios';
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
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props =>{
    const initialState = {
        contacts: [],
        current: null,
        filtered: null, // will be an array
        error: null
    };

    //Reducer - dispatch allow to 
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Actions

    //Add contact
    const addContact = async contact =>{
        //contact.id = uuidv4(); // no need since connected to MongoDB
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

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
    const filterContacts = text =>{
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear filter
    const clearFilter = () =>{
        dispatch({
            type: CLEAR_FILTER,
        })
    }

    //Return provider
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;