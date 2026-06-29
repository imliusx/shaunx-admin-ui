export type ColorTheme =
  | 'default'
  | 'violet'
  | 'yellow'
  | 'sky'
  | 'blue'
  | 'red'
  | 'lime'
  | 'emerald'
  | 'pink'

export type ColorThemeOption = {
  value: ColorTheme
  label: string
  swatchClassName: string
}

export const COLOR_THEME_COOKIE_NAME = 'color_theme'
export const COLOR_THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
export const DEFAULT_COLOR_THEME: ColorTheme = 'default'

export const COLOR_THEME_OPTIONS: ColorThemeOption[] = [
  {
    value: 'default',
    label: 'Default',
    swatchClassName: 'bg-(--theme-swatch-default)',
  },
  {
    value: 'violet',
    label: 'Violet',
    swatchClassName: 'bg-(--theme-swatch-violet)',
  },
  {
    value: 'yellow',
    label: 'Yellow',
    swatchClassName: 'bg-(--theme-swatch-yellow)',
  },
  {
    value: 'sky',
    label: 'Sky',
    swatchClassName: 'bg-(--theme-swatch-sky)',
  },
  {
    value: 'blue',
    label: 'Blue',
    swatchClassName: 'bg-(--theme-swatch-blue)',
  },
  {
    value: 'red',
    label: 'Red',
    swatchClassName: 'bg-(--theme-swatch-red)',
  },
  {
    value: 'lime',
    label: 'Lime',
    swatchClassName: 'bg-(--theme-swatch-lime)',
  },
  {
    value: 'emerald',
    label: 'Emerald',
    swatchClassName: 'bg-(--theme-swatch-emerald)',
  },
  {
    value: 'pink',
    label: 'Pink',
    swatchClassName: 'bg-(--theme-swatch-pink)',
  },
]

export const COLOR_THEME_VALUES = new Set<ColorTheme>(
  COLOR_THEME_OPTIONS.map((option) => option.value)
)

export function isColorTheme(value: string): value is ColorTheme {
  return COLOR_THEME_VALUES.has(value as ColorTheme)
}
