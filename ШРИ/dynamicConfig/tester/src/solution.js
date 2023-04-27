module.exports = function (configValue /* (key: string) => string */) {
  let currentConfig = {};
  let changeConfig = (newConfig) => {
    currentConfig = newConfig;
  };

  const makeDynamicConfig = (config) => {
    const dynamicConfig = {};
    for (let key in config) {
      if (typeof config[key] === "function") {
        dynamicConfig[key] = () => {
          return configValue(currentConfig + ":" + key);
        };
      } else if (typeof config[key] === "object") {
        dynamicConfig[key] = makeDynamicConfig(config[key]);
      } else {
        dynamicConfig[key] = config[key];
      }
    }
    return dynamicConfig;
  };

  const dynamicConfigValue = (key) => {
    return configValue(currentConfig + ":" + key);
  };

  return {
    makeDynamicConfig,
    dynamicConfigValue,
    changeConfig,
  };
};
