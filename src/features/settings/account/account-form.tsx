import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronsUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { type Language } from '@/lib/i18n/languages'
import { cn } from '@/lib/utils'
import { LANGUAGE_OPTIONS, useLanguage } from '@/context/language-provider'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DatePicker } from '@/components/date-picker'

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(30, 'Name must not be longer than 30 characters.'),
  dob: z.date('Please select your date of birth.'),
  language: z.string('Please select a language.'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [languageOpen, setLanguageOpen] = useState(false)
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: '',
      language,
    },
  })

  useEffect(() => {
    form.setValue('language', language)
  }, [form, language])

  function onSubmit(data: AccountFormValues) {
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.accountForm.name')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('settings.accountForm.namePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('settings.accountForm.nameDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('settings.accountForm.dob')}</FormLabel>
              <DatePicker selected={field.value} onSelect={field.onChange} />
              <FormDescription>
                {t('settings.accountForm.dobDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('settings.accountForm.language')}</FormLabel>
              <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={languageOpen}
                      className={cn(
                        'w-50 justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? t(
                            LANGUAGE_OPTIONS.find(
                              (option) => option.value === field.value
                            )?.labelKey ?? 'settings.accountForm.selectLanguage'
                          )
                        : t('settings.accountForm.selectLanguage')}
                      <ChevronsUpDown
                        data-icon='inline-end'
                        className='opacity-50'
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-50 p-0' align='start'>
                  <Command>
                    <CommandInput
                      placeholder={t('settings.accountForm.searchLanguage')}
                    />
                    <CommandList className='max-h-80'>
                      <CommandEmpty>
                        {t('settings.accountForm.emptyLanguage')}
                      </CommandEmpty>
                      <CommandGroup>
                        {LANGUAGE_OPTIONS.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={t(option.labelKey)}
                            data-checked={option.value === field.value}
                            className='rounded-md'
                            onSelect={() => {
                              form.setValue('language', option.value, {
                                shouldValidate: true,
                              })
                              setLanguage(option.value as Language)
                              setLanguageOpen(false)
                            }}
                          >
                            {t(option.labelKey)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('settings.accountForm.languageDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('settings.accountForm.update')}</Button>
      </form>
    </Form>
  )
}
