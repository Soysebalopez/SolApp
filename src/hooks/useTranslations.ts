import { translations } from '@/utils/translations';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<typeof translations>;

export const useTranslations = () => {
  const t = (path: TranslationPath): string => {
    return path.split('.').reduce((obj, key) => obj[key as keyof typeof obj], translations) as string;
  };

  return { t };
}; 