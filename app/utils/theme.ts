import { generateColors } from '@mantine/colors-generator'
import { type ButtonProps, type ChipProps, createTheme, type MantineTheme } from '@mantine/core'

const paleYellow = '#FEFADF'
const fierceYellow = '#D8923C'

const paleGreen = '#CDDA86'
const fierceGreen = '#5D9220'

const paleOrange = '#F8DD94'
const fierceOrange = '#F2B258'

export const theme = createTheme({
  white: paleYellow,
  colors: {
    background: generateColors(paleYellow),
    bodyText: generateColors(fierceOrange),
  },
  fontFamily: 'Dongle, sans-serif',
  fontSizes: {
    sm: '15px',
    md: '35px',
    lg: '80px',
  },
  lineHeights: {
    sm: '0.75',
    md: '1.25',
    lg: '1.50',
  },
  other: {
    buttons: {
      primary: {
        background: paleGreen,
        text: paleYellow,
      },
      secondary: {
        background: paleOrange,
        text: fierceYellow,
      },
    },
    chips: {
      default: {
        background: 'transparent',
        text: fierceOrange,
      },
      selected: {
        background: paleGreen,
        text: fierceGreen,
      },
    },
  },
  components: {
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.bodyText[5],
          fontSize: theme.fontSizes.lg,
          lineHeight: theme.lineHeights.sm,
        },
      }),
    },
    Text: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.bodyText[5],
          fontSize: theme.fontSizes.md,
        },
      }),
    },
    Button: {
      styles: (theme: MantineTheme, props: ButtonProps) => ({
        root: {
          ...(props.variant === 'primary' && {
            backgroundColor: theme.other.buttons.primary.background,
            color: theme.other.buttons.primary.text,
            fontSize: theme.fontSizes.md,
          }),
          ...(props.variant === 'secondary' && {
            backgroundColor: theme.other.buttons.secondary.background,
            color: theme.other.buttons.secondary.text,
            fontSize: theme.fontSizes.md,
          }),
        },
      }),
    },
    Chip: {
      styles: (theme: MantineTheme, props: ChipProps) => ({
        label: {
          ...(props.checked
            ? {
                color: theme.other.chips.selected.text,
                backgroundColor: theme.other.chips.selected.background,
                fontSize: theme.fontSizes.md,
              }
            : {
                color: theme.other.chips.default.text,
                backgroundColor: theme.other.chips.default.background,
                fontSize: theme.fontSizes.md,
              }),
        },
      }),
    },
  },
})
