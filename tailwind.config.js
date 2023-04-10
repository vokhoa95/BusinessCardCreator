/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      sky: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        DEFAULT: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1D4ED8',
        900: '#1E3A8A',
      },
      scarlet: {
        0: '#FFF2F2',
        100: '#FFDADA',
        200: '#FFC6CB',
        300: '#FFA6A6',
        400: '#FF7568',
        500: '#F44336',
        DEFAULT: '#F44336',
        600: '#E10B0B',
        700: '#C20000',
        800: '#980000',
        900: '#7C0000',
        1000: '#530000',
      },
      canary: {
        0: '#FFF9E5',
        100: '#FFF4CE',
        200: '#FFEBA4',
        300: '#FFDF7A',
        400: '#FFD54F',
        500: '#FEC006',
        DEFAULT: '#FEC006',
        600: '#F3AF00',
        700: '#D69A00',
        800: '#A77900',
        900: '#7D5B01',
        1000: '#554700',
      },
      gray: {
        0: '#FBFBFB',
        50: '#F5F6F7',
        100: '#EBECEF',
        200: '#CED0D4',
        300: '#B2B4B9',
        400: '#94969B',
        500: '#75777C',
        DEFAULT: '#75777C',
        600: '#545559',
        700: '#3C3D40',
        800: '#242527',
        850: '#1B1B1B',
        900: '#111111',
        1000: '#000000',
      },
      'light-ui': {
        100: '#FFFFFF',
        DEFAULT: '#FFFFFF',
        200: '#F5F6F7',
      },
      'dark-ui': {
        100: '#111111',
        DEFAULT: '#111111',
        200: '#242527',
      },
      transparent: 'transparent',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
