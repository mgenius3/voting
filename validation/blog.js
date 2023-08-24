const packageValidation = async (data) => {
  if (!data.name) throw Error("No topic name");
  if (!data.description) throw Error("No description");
  if (!data.conclusion) throw Error("No conclusion");
  if (!data.introduction) throw Error("No introduction");
};

module.exports = { packageValidation };
