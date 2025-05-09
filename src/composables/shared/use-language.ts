import { STORAGE_KEYS } from '@/constants/shared.const';
import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocalStorage } from '@vueuse/core';

export const useLanguage = () => {
  const { locale } = useI18n();
  const languageStorage = useLocalStorage<ELanguageCode>(
    STORAGE_KEYS.LANGUAGE,
    ELanguageCode.English,
  );

  const setLanguage = (newLang: ELanguageCode) => {
    languageStorage.value = newLang;
  };

  const language = computed(() => languageStorage.value);

  watch(
    languageStorage,
    (newLang) => {
      locale.value = newLang;
    },
    { immediate: true },
  );

  return {
    language,
    setLanguage,
  };
};
