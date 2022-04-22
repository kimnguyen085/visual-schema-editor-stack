import apiUtils from '../../utils/ApiUtils';

export const SET_SAMPLE_OPEN = 'SET_SAMPLE_OPEN';
export const MODIFY_JSON_TREE = 'MODIFY_JSON_TREE';
export const VIEW_JSON_SCHEMA = 'VIEW_JSON_SCHEMA';
export const CLEAR_JSON_SCHEMA = 'CLEAR_JSON_SCHEMA';
export const HIDE_MESSAGE = 'MESSAGE_CLOSE';
export const SHOW_MESSAGE = 'MESSAGE_SHOW';
export const GENERATE_JSON_SCHEMA = 'GENERATE_JSON_SCHEMA';

function findTheKeyAndAdd(sourceObject, destinationKey, addItem) {
  // console.log(sourceObject, destinationKey, addItem);
  // drag to root
  if (destinationKey === 'jsonSchema') {
    if (!addItem?.prop) {
      return sourceObject;
    }

    return addItem?.prop == 'object' ? {"object" : {}} : {...addItem};
    // return sourceObject;
  }

  typeof sourceObject === 'object' && Object.keys(sourceObject).map((key, idx) => {
    if (key == destinationKey) {
      if (typeof sourceObject[key] === 'object') {
        var length = Object.keys(sourceObject[key]).length;
        if (length !== 0 && addItem?.prop !== 'object') {
          var propKey = Object.keys(addItem)[0];
          addItem[propKey+''+length] = addItem[propKey];
          delete addItem[propKey];
          // console.log(addItem, ' -------------');
        }
        if (addItem?.prop === 'object') {
          addItem['object'+length] = {};
        }
        sourceObject[key] = {...sourceObject[key], ...addItem};

      }
      return sourceObject;
    }
    findTheKeyAndAdd(sourceObject[key], destinationKey, addItem);
  });
  // console.log(sourceObject);
  return sourceObject;
}

export function generateJsonSchema(schema) {
    return {
        type: GENERATE_JSON_SCHEMA,
        payload: schema
    };
}

export function viewJsonSchema() {
  return {
    type: VIEW_JSON_SCHEMA,
    // payload: schema
  };
}

export function clearJsonSchema() {
  return {
    type: CLEAR_JSON_SCHEMA
  }
}

export function addJsonSchema(crrTree, addItem, destinationItem) {
  var modifiedTree = findTheKeyAndAdd(crrTree, destinationItem, addItem);
  return {
      type: MODIFY_JSON_TREE,
      payload: modifiedTree
  };
}

export function jsonTreeChanges() {
    return {
        type: MODIFY_JSON_TREE
    };
}

export function saveJsonSchema(schema) {  
  return dispatch => {
      var requestData = {"data": JSON.stringify(schema)};
      apiUtils.saveJsonSchema(requestData).then(response => {
        console.log(response);
        if (response?.data && response.data.includes('Saved schema successfully')) {
          dispatch(showMessage({
            message: 'Schema is saved to server',
            variant: 'info',
            autoHideDuration: 7000
          }));
        }
      }).catch(error => {
        console.log(error);
        dispatch(showMessage({
          message: 'Schema is failed to save to server',
          variant: 'error',
          autoHideDuration: 7000
        }));
      });
      
  };
}

export function hideMessage()
{
    return {
        type: HIDE_MESSAGE
    }
}

export function showMessage(options)
{
    return {
        type: SHOW_MESSAGE,
        options
    }
}
