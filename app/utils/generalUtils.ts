export const debounce = (func: Function, delay: number) => {
  let timeoutId: number | null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      return func(...args);
    }, delay);
  };
};
