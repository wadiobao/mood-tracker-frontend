import { useLanguage as useLanguageContext } from '../features/i18n/LanguageContext';

export const useLanguage = () => {
    return useLanguageContext();
};
