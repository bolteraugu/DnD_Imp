/** Fairly sure this is the default code for babel (JavaScript compiler) for expo*/
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], //Extends default preset and adds support for font icons, decorators etc...
  };
};
