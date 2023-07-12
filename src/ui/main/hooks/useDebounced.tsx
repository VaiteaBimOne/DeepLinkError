import { debounce, DebounceSettings } from 'lodash';
import { useCallback, useRef } from 'react';

export const DEFAULT_DEBOUNCED_TIME = 1000;

const DEFAULT_OPTIONS = { leading: true, trailing: false };

interface DebounceProps {
  debounceTime?: number;
  options?: DebounceSettings;
}

const useDebounced = (
  callBack: () => void,
  { debounceTime = DEFAULT_DEBOUNCED_TIME, options = DEFAULT_OPTIONS }: DebounceProps = {},
): (() => void) => {
  const throttled = useRef(debounce(callBack, debounceTime, options));

  return useCallback(() => {
    throttled.current();
  }, []);
};

export default useDebounced;
