import enMessages from './en.json';

export function useTranslations(namespace?: string) {
  return function t(key: string, values?: Record<string, string | number>): string {
    const fullPath = namespace ? `${namespace}.${key}` : key;
    const parts = fullPath.split('.');
    
    let current: any = enMessages;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return key;
      }
    }

    if (typeof current === 'string') {
      if (values) {
        return current.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
      }
      return current;
    }

    return key;
  };
}
