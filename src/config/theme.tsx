
import { extendTheme, theme as chakraTheme } from '@chakra-ui/react'

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` }

// const breakpoints = ['40em', '52em', '64em']

const theme = extendTheme({
  ...chakraTheme,
  styles: {
    global: {
      body: {
        bg: "#F6F7F9",
        // color: "#333333",
        color: '#020621',
      },
    },
  },
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
    primary: '#25CB67',  // Primary
    _primary: '#05AF3C', // Priamry variant 
    secondary: '#020621', // Secondanry
    _secondary: '#161e2c', // Secondanry variant
    error: '#B00020',
    background: '#F6F7F9',
    surface: '#FFFFFF',
    borders: '#d9e3eb',
    subtext: '#717171',
  },
  fonts,
  // breakpoints,
  components: {
    Link: {
      variants: {
        "primary": {
          fontWeight: 'semibold',
          _hover: {
            textDecoration: 'none',
            color: 'primary'
          },
        },
      },
    },
    Button: {
      variants: {
        "primary": {
          bg: "primary",
          borderColor: "#05AF3C",
          color: '#FFF',
          _hover: {
            bg: "_primary",
          },
        },
        "secondary": {
          bg: "secondary",
          borderColor: "#05AF3C",
          color: '#FFF',
          _hover: {
            bg: "_secondary",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: '_primary',
            borderWidth: 1,
            outline: 0,
            boxShadow: 'none',
          },
          boxShadow: 'none',
        },
      },
      variants: {
        outline: () => ({
          field: {
            _focus: {
              borderColor: '_primary',
              borderWidth: 1,
              outline: 0,
              boxShadow: 'none',
            },
            _hover: {
              borderColor: '_primary',
              borderWidth: 1,
            }
          },
        }),
        "app": {
          field: {
            _focus: {
              borderColor: '_primary',
              borderWidth: 1,
              outline: 0,
            },
          },
        },
      },
    },
  }
})

export default theme