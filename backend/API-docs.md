This Express.js server provides vehicle-related data

GET /api/makes – Returns a list of unique vehicle makes.

GET /api/models?make={make} – Returns unique models for a given make.

GET /api/submodels?make={make}&model={model} – Returns unique submodels for a given make and model.

GET /api/details?make={make}&model={model}&submodel={submodel} – Returns available transmissions, fuel types, and engine sizes for a given vehicle.

The server runs on port 3001.