import { cookies } from 'next/headers'

/**
 * Get the current locale from cookies or return default
 * @returns The current locale code ('nl' or 'en')
 */
export async function getLocale(): Promise<'nl' | 'en'> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value
  
  // Return the locale if it's valid, otherwise return default
  if (locale === 'nl' || locale === 'en') {
    return locale
  }
  
  return 'nl' // Default locale
}

