import {createTheme, Loader} from '@mantine/core';
import {RingLoader} from './ui';

export const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: {...Loader.defaultLoaders, ring: RingLoader},
        type: 'ring',
      },
    }),
  },
});
