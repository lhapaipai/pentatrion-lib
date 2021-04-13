import { resolve } from 'path';

export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'pentatrionLib'
    },
    rollupOptions: {
      external: ['mini-notifier'],
      output: {
        globals: {
          'mini-notifier': 'miniNotifier'
        }
      }
    }
  }
};
