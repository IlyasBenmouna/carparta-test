export const fetchMakes = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/makes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching makes:', error);
    throw error;
  }
};

export const fetchModels = async (make: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/models?make=${encodeURIComponent(make)}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

export const fetchSubModels = async (make: string, model: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/submodels?make=${encodeURIComponent(
        make
      )}&model=${encodeURIComponent(model)}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching submodels:', error);
    throw error;
  }
};

export const fetchDetails = async (
  make: string,
  model: string,
  submodel?: string | null
) => {
  try {
    const url = `http://localhost:3001/api/details?make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}${
      submodel ? `&submodel=${encodeURIComponent(submodel)}` : ''
    }`;

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};
