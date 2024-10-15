import { ELanguageCode } from '@/models/enums/shared.enum';
import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

const locales: Record<string, any> = import.meta.glob('@/locales/**/*.json', { eager: true });
const messages: Record<string, any> = {};

Object.keys(locales).forEach((path) => {
  const match = path.match(/\/src\/locales\/(.*?)\/(.*?)\.json$/);

  if (!match || !match[1] || !match[2]) return;

  const locale = match[1] as ELanguageCode;
  const data = locales[path].default;

  if (!Object.values(ELanguageCode).includes(locale))
    return console.warn(`Locale '${locale}' is not supported.`);

  if (!messages[locale]) messages[locale] = {};

  Object.assign(messages[locale], data);
});

const i18nPlugin = {
  install: (app: App) => {
    const i18n = createI18n({
      legacy: false,
      locale: ELanguageCode.English,
      messages
    });

    app.use(i18n);
  }
};

export default i18nPlugin;
