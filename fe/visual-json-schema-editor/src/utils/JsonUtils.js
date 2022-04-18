function getAdditionalDetailForProp(key) {
  switch (key) {
    case 'number': 
      return {"multipleOf": null,
              "minimum": null,
              "excludeMinimum": null,
              "maximum": null,
              "excludeMaximum": null};
    case 'string': 
      return {"minLength": null,
              "maxLength": null};
    case 'integer': 
      return {"multipleOf": null,
              "minimum": null,
              "excludeMinimum": null,
              "maximum": null,
              "excludeMaximum": null};
    case 'array':
      return {"minItems": null,
              "maxItems": null};
    default:
      return {};
  }
}

function getPropDetailJson(key, value){
  var ojbAdditionalDetail = getAdditionalDetailForProp(value);
  var obj = {}; 
  obj[key] = {"type" : value, ...ojbAdditionalDetail};
  return obj;
}

function getPropertiesJson(){
  return {"properties" : {}};
}

function getObjectJson(){
  return {"type" : "object"};
}

function recursiveGenerateJsonSchema(sourceObject, treeSchema) {
  console.log(sourceObject, treeSchema);
  typeof treeSchema === 'object' && Object.keys(treeSchema).map((key, idx) => {
    if (key === 'object') {
      var jsonObj = getObjectJson();
      sourceObject = {...sourceObject, ...jsonObj};
      sourceObject = {...recursiveGenerateJsonSchema(sourceObject, treeSchema[key])};
      // recursiveGenerateJsonSchema(sourceObject, treeSchema[key]);
    }

    if (key === 'properties') {
      var jsonObj = getPropertiesJson();
      sourceObject = {...sourceObject, ...jsonObj};
      console.log(sourceObject, treeSchema[key]);
      sourceObject[key] = recursiveGenerateJsonSchema(sourceObject[key], treeSchema[key]);
      console.log(sourceObject);
    }

    if (key.includes('prop') && key !== 'properties') {
      var jsonObj = getPropDetailJson(key, treeSchema[key]);
      sourceObject = {...sourceObject, ...jsonObj};
    }
  });

  return sourceObject;
}

export function generateJsonSchema(treeSchema) {
  var schema = {};
  schema = recursiveGenerateJsonSchema(schema, treeSchema);
  console.log(schema);
  return schema;
}