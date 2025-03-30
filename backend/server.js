const express = require('express');
const cors = require('cors');
const app = express();
const vehicles = require('./data/vehicles.json');

app.use(cors());

app.get('/api/makes', (req, res) => {
    const uniqueMakes = [...new Set(vehicles.map(vehicle => vehicle.make))];
    res.json(uniqueMakes);
});

app.get('/api/models', (req, res) => {
    const make = req.query.make;
    if (!make) return res.status(400).json({ error: 'Make parameter required' });

    const uniqueModels = [...new Set(vehicles
        .filter(vehicle => vehicle.make === make)
        .map(vehicle => vehicle.model)
    )];

    if (uniqueModels.length === 0) {
        return res.status(404).json({ error: 'No models found for this make' });
    }

    res.json(uniqueModels);
});

app.get('/api/submodels', (req, res) => {
    const { make, model } = req.query;
    if (!make) return res.status(400).json({ error: 'Make parameters required' });
    if (!model) return res.status(400).json({ error: 'Model parameter required' });

    const uniqueSubmodels = [...new Set(vehicles
        .filter(vehicle => vehicle.make === make && vehicle.model === model)
        .map(vehicle => vehicle.submodel)
        .filter(submodel => submodel !== null)
    )];

    if (uniqueSubmodels.length === 0) {
        return res.status(404).json({ error: 'No submodels found for this make and model' });
    }

    res.json(uniqueSubmodels);
});

app.get('/api/details', (req, res) => {
    const { make, model, submodel } = req.query;
    if (!make) return res.status(400).json({ error: 'Make parameter required' });
    if (!model) return res.status(400).json({ error: 'Model parameter required' });

    let filteredVehicles = vehicles.filter(vehicle =>
        vehicle.make === make &&
        vehicle.model === model
    );

    if (submodel) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
            vehicle.submodel === (submodel === 'null' ? null : submodel)
        );
    } else {
        filteredVehicles = filteredVehicles.filter(vehicle =>
            vehicle.submodel === null
        );
    }

    const response = {
        transmissions: [...new Set(filteredVehicles.map(v => v.transmission))].filter(Boolean).sort(),
        fuels: [...new Set(filteredVehicles.map(v => v.fuel))].filter(Boolean).sort(),
        engineSizes: [...new Set(filteredVehicles.map(v => v.engineSize))].filter(Boolean).sort(),
    };

    res.json(response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
