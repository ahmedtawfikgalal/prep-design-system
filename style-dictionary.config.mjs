import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const sd = new StyleDictionary({
  source: ['design-system/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: formats.cssVariables,
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();