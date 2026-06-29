import { type CSSProperties, type SVGProps } from 'react'
import { Root as Radio, Item } from '@radix-ui/react-radio-group'
import { CircleCheck, Palette, RotateCcw } from 'lucide-react'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { IconThemeDark } from '@/assets/custom/icon-theme-dark'
import { IconThemeLight } from '@/assets/custom/icon-theme-light'
import { IconThemeSystem } from '@/assets/custom/icon-theme-system'
import {
  COLOR_THEME_OPTIONS,
  type ColorTheme,
} from '@/lib/theme/color-theme'
import { cn } from '@/lib/utils'
import { useColorTheme } from '@/context/color-theme-provider'
import { type Collapsible, useLayout } from '@/context/layout-provider'
import { useTheme } from '@/context/theme-provider'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useSidebar } from './ui/sidebar'

export function ConfigDrawer() {
  const { setOpen } = useSidebar()
  const { resetColorTheme } = useColorTheme()
  const { resetTheme } = useTheme()
  const { resetLayout } = useLayout()

  const handleReset = () => {
    setOpen(true)
    resetColorTheme()
    resetTheme()
    resetLayout()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' aria-label='Open theme settings'>
          <Palette className='size-[1.2rem]' aria-hidden='true' />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='pb-0 text-start'>
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription>
            Adjust the appearance and layout to suit your preferences.
          </SheetDescription>
        </SheetHeader>
        <div className='space-y-6 overflow-y-auto px-4'>
          <ThemeConfig />
          <ColorConfig />
          <SidebarConfig />
          <LayoutConfig />
        </div>
        <SheetFooter className='items-end gap-2'>
          <Button
            variant='destructive'
            size='sm'
            onClick={handleReset}
            aria-label='Reset all settings to default values'
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SectionTitle({
  title,
  showReset = false,
  onReset,
  resetAriaLabel,
  className,
}: {
  title: string
  showReset?: boolean
  onReset?: () => void
  /** Shown on the small per-section reset (RotateCcw) for accessibility and tests. */
  resetAriaLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground',
        className
      )}
    >
      {title}
      {showReset && onReset && (
        <Button
          type='button'
          size='icon'
          variant='secondary'
          className='size-4 rounded-full'
          onClick={onReset}
          aria-label={resetAriaLabel}
        >
          <RotateCcw className='size-3' />
        </Button>
      )}
    </div>
  )
}

function RadioGroupItem({
  item,
  isTheme = false,
}: {
  item: {
    value: string
    label: string
    icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
  }
  isTheme?: boolean
}) {
  return (
    <Item
      value={item.value}
      className={cn('group outline-none', 'transition duration-200 ease-in')}
      aria-label={`Select ${item.label.toLowerCase()}`}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          'relative rounded-[6px] ring-[1px] ring-border',
          'group-data-[state=checked]:shadow-2xl group-data-[state=checked]:ring-0',
          'group-focus-visible:ring-2'
        )}
        role='img'
        aria-hidden='false'
        aria-label={`${item.label} option preview`}
      >
        <CircleCheck
          className={cn(
            'size-6 fill-primary stroke-primary-foreground',
            'group-data-[state=unchecked]:hidden',
            'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
          )}
          aria-hidden='true'
        />
        <item.icon
          className={cn(
            !isTheme &&
              'fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground'
          )}
          aria-hidden='true'
        />
      </div>
      <div
        className='mt-1 text-xs'
        id={`${item.value}-description`}
        aria-live='polite'
      >
        {item.label}
      </div>
    </Item>
  )
}

function ThemeConfig() {
  const { defaultTheme, theme, setTheme } = useTheme()
  return (
    <div>
      <SectionTitle
        title='Theme'
        showReset={theme !== defaultTheme}
        onReset={() => setTheme(defaultTheme)}
        resetAriaLabel='Reset theme preference to default'
      />
      <Radio
        value={theme}
        onValueChange={setTheme}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select theme preference'
        aria-describedby='theme-description'
      >
        {[
          {
            value: 'system',
            label: 'System',
            icon: IconThemeSystem,
          },
          {
            value: 'light',
            label: 'Light',
            icon: IconThemeLight,
          },
          {
            value: 'dark',
            label: 'Dark',
            icon: IconThemeDark,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id='theme-description' className='sr-only'>
        Choose between system preference, light mode, or dark mode
      </div>
    </div>
  )
}

function ColorConfig() {
  const {
    colorTheme,
    defaultColorTheme,
    resetColorTheme,
    setColorTheme,
  } = useColorTheme()

  return (
    <div>
      <SectionTitle
        title='Color'
        showReset={colorTheme !== defaultColorTheme}
        onReset={resetColorTheme}
        resetAriaLabel='Reset color theme to default'
      />
      <Radio
        value={colorTheme}
        onValueChange={(value) => setColorTheme(value as ColorTheme)}
        className='grid w-full max-w-md grid-cols-3 gap-3'
        aria-label='Select color theme'
        aria-describedby='color-theme-description'
      >
        {COLOR_THEME_OPTIONS.map((option) => {
          const colorStyle = {
            '--color-theme-option': `var(--theme-swatch-${option.value})`,
            '--color-theme-option-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 16%, white)`,
            '--color-theme-option-hover-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 24%, white)`,
            '--color-theme-option-checked-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 32%, white)`,
            '--color-theme-option-foreground': `color-mix(in oklch, var(--theme-swatch-${option.value}) 58%, black)`,
            '--color-theme-option-dark-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 25%, black)`,
            '--color-theme-option-dark-hover-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 33%, black)`,
            '--color-theme-option-dark-checked-background': `color-mix(in oklch, var(--theme-swatch-${option.value}) 42%, black)`,
            '--color-theme-option-dark-foreground': `color-mix(in oklch, var(--theme-swatch-${option.value}) 24%, white)`,
          } as CSSProperties

          return (
            <Item
              key={option.value}
              value={option.value}
              className='group outline-none'
              aria-label={`Select ${option.label.toLowerCase()} color theme`}
            >
              <div
                className={cn(
                  'relative flex h-8 items-center gap-2 rounded-lg px-2 text-sm transition-colors',
                  'bg-(--color-theme-option-background) text-(--color-theme-option-foreground)',
                  'hover:bg-(--color-theme-option-hover-background)',
                  'group-data-[state=checked]:bg-(--color-theme-option-checked-background)',
                  'dark:bg-(--color-theme-option-dark-background) dark:text-(--color-theme-option-dark-foreground)',
                  'dark:hover:bg-(--color-theme-option-dark-hover-background)',
                  'dark:group-data-[state=checked]:bg-(--color-theme-option-dark-checked-background)',
                  'group-focus-visible:ring-2 group-focus-visible:ring-ring'
                )}
                style={colorStyle}
              >
                <CircleCheck
                  className={cn(
                    'size-6 fill-primary stroke-primary-foreground',
                    'group-data-[state=unchecked]:hidden',
                    'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
                  )}
                  aria-hidden='true'
                />
                <span
                  aria-hidden='true'
                  className={cn(
                    'size-3.5 shrink-0 rounded-full ring-1 ring-border',
                    option.swatchClassName
                  )}
                />
                <span className='min-w-0 truncate'>{option.label}</span>
              </div>
            </Item>
          )
        })}
      </Radio>
      <div id='color-theme-description' className='sr-only'>
        Choose the accent color palette used by semantic UI tokens
      </div>
    </div>
  )
}

function SidebarConfig() {
  const { defaultVariant, variant, setVariant } = useLayout()
  return (
    <div className='max-md:hidden'>
      <SectionTitle
        title='Sidebar'
        showReset={defaultVariant !== variant}
        onReset={() => setVariant(defaultVariant)}
        resetAriaLabel='Reset sidebar style to default'
      />
      <Radio
        value={variant}
        onValueChange={setVariant}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select sidebar style'
        aria-describedby='sidebar-description'
      >
        {[
          {
            value: 'inset',
            label: 'Inset',
            icon: IconSidebarInset,
          },
          {
            value: 'floating',
            label: 'Floating',
            icon: IconSidebarFloating,
          },
          {
            value: 'sidebar',
            label: 'Sidebar',
            icon: IconSidebarSidebar,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='sidebar-description' className='sr-only'>
        Choose between inset, floating, or standard sidebar layout
      </div>
    </div>
  )
}

function LayoutConfig() {
  const { open, setOpen } = useSidebar()
  const { defaultCollapsible, collapsible, setCollapsible } = useLayout()

  const radioState = open ? 'default' : collapsible

  return (
    <div className='max-md:hidden'>
      <SectionTitle
        title='Layout'
        showReset={radioState !== 'default'}
        onReset={() => {
          setOpen(true)
          setCollapsible(defaultCollapsible)
        }}
        resetAriaLabel='Reset layout options to default'
      />
      <Radio
        value={radioState}
        onValueChange={(v) => {
          if (v === 'default') {
            setOpen(true)
            return
          }
          setOpen(false)
          setCollapsible(v as Collapsible)
        }}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select layout style'
        aria-describedby='layout-description'
      >
        {[
          {
            value: 'default',
            label: 'Default',
            icon: IconLayoutDefault,
          },
          {
            value: 'icon',
            label: 'Compact',
            icon: IconLayoutCompact,
          },
          {
            value: 'offcanvas',
            label: 'Full layout',
            icon: IconLayoutFull,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='layout-description' className='sr-only'>
        Choose between default expanded, compact icon-only, or full layout mode
      </div>
    </div>
  )
}
