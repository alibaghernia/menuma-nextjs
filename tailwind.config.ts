import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#3177FF',
        typography: '#434343',
        secondary: '#EEB33F',
        background: '#FcFcFc',
        more: '#EEB33F',
      },
    },
    fontFamily: {
      sans: ['Vazirmatn'],
    },
  },
  plugins: [],
  important: true,
};
export default config;
