module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@components': './app/components',
            '@screens': './app/screens',
            '@store': './app/store',
            '@services': './app/services',
            '@utils': './app/utils',
            '@constants': './app/constants',
            '@hooks': './app/hooks',
            '@types': './app/types',
          },
        },
      ],
    ],
  };
};
