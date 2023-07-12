
import { NativeModules, Platform } from 'react-native';

interface IOSNativeModules {
  SettingsManager: {
    settings: {
      AppleLocale?: string;
      AppleLanguages: string[];
    };
  };
}

interface AndroidNativeModules {
  I18nManager: {
    localeIdentifier: string;
  };
}

export const DEFAULT_LANGUAGE_CODE = 'en';

const getIosLanguage = () => {
  const iOSNativeModules = NativeModules as IOSNativeModules;
  const appleLocale = iOSNativeModules.SettingsManager?.settings?.AppleLocale;

  if (!appleLocale) {
    // Workaround, depending of ios version, AppleLocale can be undefined,
    // Take first of AppleLanguages array instead ["en", "en-NZ"]
    const firstAppleLanguage = iOSNativeModules.SettingsManager?.settings?.AppleLanguages[0];
    return firstAppleLanguage || DEFAULT_LANGUAGE_CODE;
  }

  return appleLocale;
};

class LocaleService {
  public static detect(): string {
    const languageCodeFromPlatform: () => string = () => {
      return Platform.select({
        android: (NativeModules as AndroidNativeModules).I18nManager?.localeIdentifier,
        default: DEFAULT_LANGUAGE_CODE,
        ios: getIosLanguage(),
      });
    };

    const normalizeLanguageCode: (code: string) => string = (code) => {
      return code?.replace('_', '-').toLowerCase();
    };

    return normalizeLanguageCode(languageCodeFromPlatform());
  }

  public static getLanguage() {
    const detectedLanguage = LocaleService.detect();
    const language = detectedLanguage.slice(0, detectedLanguage.indexOf('-'));

    if (language === 'fr') {
      return 'fr';
    }

    return 'en';
  }
}

export default LocaleService;
