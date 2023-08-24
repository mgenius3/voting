const packageValidation = async (data) => {
  if (!data.name) throw Error("No model");
  if (!data.type) throw Error("No automobile type");
  if (!data.manufacturer) throw Error("No year of manufacture");
  if (!data.category) throw Error("No category");
  if (!data.material) throw Error("No material");
  if (!data.conditions) throw Error("No condition");
  if (!data.price) throw Error("No price");
  if (!data.description) throw Error("No description");
  if (!JSON.parse(data.files).length) throw Error("No images");
};

module.exports = { packageValidation };
