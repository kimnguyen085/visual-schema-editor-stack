import * as Actions from '../actions/app.actions';
var _ = require('lodash');

const initialState = {
    state  : false,
    options: {
        children: 'Hi'
    },
    jsonTreeSchema: {
        // "object": {
        //     "properties": {
        //         "prop": "integer"
        //     },
        // }
    },
    generatedSchema:{
        // "type": "object",
        // "properties": {
        //     "prop": {
        //         "type": "number",
        //         "multipleOf": null,
        //         "minimum": null,
        //         "excludeMinimum": null,
        //         "maximum": null,
        //         "excludeMaximum": null
        //     },
        //     "prop1": {
        //         "type": "integer",
        //         "multipleOf": null,
        //         "minimum": null,
        //         "excludeMinimum": null,
        //         "maximum": null,
        //         "excludeMaximum": null
        //     },
        //     "prop2": {
        //         "type": "string",
        //         "minLength": null,
        //         "maxLength": null
        //     }
        // }
    },
    messageState: null,
    messageOptions: {
        anchorOrigin    : {
            vertical  : 'top',
            horizontal: 'center'
        },
        autoHideDuration: 4000,
        message         : "Hi",
        variant         : null
    },
    loading: false,
    clearSchema: false,
    isJsonChanges: false,
};

const appReducers = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_SAMPLE_OPEN:
        {
            return {
                ...state,
                state  : true,
                loading: action.payload,
            };
        }
        case Actions.MODIFY_JSON_TREE: 
        {
            return {
                ...state,
                loading: !state.loading,
                jsonTreeSchema: action.payload,
            }
        }
        case Actions.IS_JSON_TREE_CHANGES:
        {
            return {
                ...state,
                isJsonChanges: !state.isJsonChanges,
            }
        }
        case Actions.VIEW_JSON_SCHEMA:
        {
            return {
                ...state,
                // generatedSchema: action.payload,
            }   
        }
        case Actions.CLEAR_JSON_SCHEMA:
        {
            return {
                ...state,
                jsonTreeSchema: {},
                generatedSchema: {},
                clearSchema: !state.clearSchema
            }
        }
        case Actions.GENERATE_JSON_SCHEMA:
        {
            return {
                ...state,
                // generatedSchema: merge(state.generatedSchema, action.payload),// {...state.generatedSchema, ...action.payload},
                generatedSchema: action.payload,
                loading: !state.loading,
            }
        }
        case Actions.SHOW_MESSAGE:
        {
            return {
                ...state,
                messageState  : true,
                messageOptions: {
                    ...initialState.messageOptions,
                    ...action.options
                }
            }
        }
        case Actions.HIDE_MESSAGE:
        {
            return {
                ...state,
                messageState: null
            };
        }
        default:
        {
            return state;
        }
    }
};

export default appReducers;