import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import {
  type SupportedLanguage,
  switchLanguageInPath,
  getCurrentLanguage,
} from '@/utils/language-routing'

const languages = [
  { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
  { code: 'es' as SupportedLanguage, name: 'Español', flag: '🇪🇸' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // Get current language from URL
  const currentLangCode = getCurrentLanguage(location.pathname)
  const currentLanguage =
    languages.find((lang) => lang.code === currentLangCode) || languages[0]

  const changeLanguage = async (langCode: SupportedLanguage) => {
    // Change i18n language
    await i18n.changeLanguage(langCode)

    // Navigate to the new language route
    const newPath = switchLanguageInPath(location.pathname, langCode)

    // Navigate to new path
    navigate({ to: newPath as any })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={
              currentLangCode === language.code ? 'bg-neutral-100' : ''
            }
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
