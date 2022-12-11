const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['src/**/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        132: '33rem',
      },
      colors: {
        ash: '#e5e7eb',
        accent: '#e0ce8a',
        pine5: {
          50: '#ECF1EC',
          100: '#DEE5DE',
          200: '#CED7CE',
          300: '#B9C4B9',
          400: '#A1AEA1',
          500: '#859386',
          600: '#69786B',
          700: '#4E5C50',
          800: '#3A463D',
          900: '#2A352E',
        },
        pine2: {
          50: '#E0E5E0',
          100: '#DAE1DA',
          200: '#CED7CE',
          300: '#BCC7BC',
          400: '#8EA28F',
          500: '#69816B',
          600: '#526854',
          700: '#405744',
          800: '#2A3C2E',
          900: '#1A2C20',
        },
        pine: {
          50: '#F9FAF9',
          100: '#F0F5F0',
          200: '#E3EAE3',
          300: '#D0D6D0',
          400: '#A6ABA5',
          500: '#7C807B',
          600: '#585A57',
          700: '#363635',
          800: '#181918',
          900: '#121211',
        },
        pine6: {
          50: '#ECF1EC',
          100: '#DEE5DE',
          200: '#CDD6CD',
          300: '#BAC4BA',
          400: '#A5B0A5',
          500: '#8E998E',
          600: '#758075',
          700: '#5A635A',
          800: '#3E453E',
          900: '#202420',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#A2A7AF',
          500: '#717680',
          600: '#4F5560',
          700: '#292D37',
          800: '#10131A',
          900: '#0D0E12',
        },
      },
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'md:grid-cols-1',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
    'xl:grid-cols-1',
    'xl:grid-cols-2',
    'xl:grid-cols-3',
    'xl:grid-cols-4',
    'order-1',
    'order-2',
    'order-3',
    'order-4',
    'order-5',
    'order-6',
    'order-7',
    'order-8',
    'order-9',
    'order-10',
    'order-11',
    'order-12',
    'order-13',
    'order-14',
    'order-15',
    'order-16',
    'md:order-1',
    'md:order-2',
    'md:order-3',
    'md:order-4',
    'md:order-5',
    'md:order-6',
    'md:order-7',
    'md:order-8',
    'md:order-9',
    'md:order-10',
    'md:order-11',
    'md:order-12',
    'md:order-13',
    'md:order-14',
    'md:order-15',
    'md:order-16',
    'xl:order-1',
    'xl:order-2',
    'xl:order-3',
    'xl:order-4',
    'xl:order-5',
    'xl:order-6',
    'xl:order-7',
    'xl:order-8',
    'xl:order-9',
    'xl:order-10',
    'xl:order-11',
    'xl:order-12',
    'xl:order-13',
    'xl:order-14',
    'xl:order-15',
    'xl:order-16',
    'gap-2',
    'gap-4',
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-3',
    'md:col-span-4',
    'md:col-span-5',
    'md:col-span-6',
    'md:col-span-7',
    'md:col-span-8',
    'md:col-span-9',
    'md:col-span-10',
    'md:col-span-11',
    'md:col-span-12',
    'lg:col-span-1',
    'lg:col-span-2',
    'lg:col-span-3',
    'lg:col-span-4',
    'lg:col-span-5',
    'lg:col-span-6',
    'lg:col-span-7',
    'lg:col-span-8',
    'lg:col-span-9',
    'lg:col-span-10',
    'lg:col-span-11',
    'lg:col-span-12',
    'hidden',
    'md:hidden',
    'lg:hidden',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
    }),
  ],
};
