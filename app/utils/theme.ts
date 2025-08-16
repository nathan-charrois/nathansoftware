import { generateColors } from '@mantine/colors-generator'
import { type ButtonProps, type ChipProps, createTheme, type MantineTheme } from '@mantine/core'

import {
  borderWidth,
  defaultPadding,
  fierceGreen,
  fierceOrange,
  fierceYellow,
  paleBlue,
  paleGreen,
  paleOrange,
  paleYellow,
  sunshineYellow,
} from './colors'

export const theme = createTheme({
  white: paleYellow,
  colors: {
    background: generateColors(paleYellow),
    bodyText: generateColors(fierceOrange),
  },
  fontFamily: 'Dongle, sans-serif',
  fontSizes: {
    xs: '30px',
    sm: '33px',
    md: '39px',
    lg: '48px',
    xl: '60px',
  },
  lineHeights: {
    xs: '0.8',
    sm: '1',
    md: '1.2',
    lg: '1.5',
    xl: '1.75',
  },
  components: {
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.bodyText[5],
          lineHeight: theme.lineHeights.sm,
        },
      }),
    },
    Text: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.bodyText[5],
        },
      }),
    },
    Button: {
      styles: (theme: MantineTheme, props: ButtonProps) => ({
        label: {
          overflow: 'visible',
        },
        root: {
          padding: '30px 18px 24px 18px',
          ...(props.variant === 'primary' && {
            backgroundColor: paleGreen,
            color: paleYellow,
            fontSize: theme.fontSizes.md,
          }),
          ...(props.variant === 'secondary' && {
            backgroundColor: paleOrange,
            color: fierceYellow,
            fontSize: theme.fontSizes.md,
          }),
        },
      }),
    },
    Chip: {
      styles: (theme: MantineTheme, props: ChipProps) => ({
        iconWrapper: {
          display: 'none',
        },
        label: {
          ...(props.checked
            ? {
                color: fierceGreen,
                backgroundColor: paleGreen,
                fontSize: theme.fontSizes.md,
                padding: defaultPadding,
              }
            : {
                color: fierceOrange,
                backgroundColor: sunshineYellow,
                fontSize: theme.fontSizes.md,
                padding: defaultPadding,
              }),
        },
      }),
    },
    Slider: {
      styles: () => ({
        bar: {
          backgroundColor: paleBlue,
        },
        track: {
          backgroundColor: paleBlue,
        },
        mark: {
          backgroundColor: paleBlue,
          borderColor: paleBlue,
        },
        thumb: {
          backgroundColor: paleYellow,
          color: fierceOrange,
          borderColor: fierceOrange,
          borderWidth: borderWidth,
        },
      }),
    },
  },
})
