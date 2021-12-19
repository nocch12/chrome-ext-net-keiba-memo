import useLocalStorage from './useStorage';

type TRaceStorage = {
  [id: string]: string;
};

const useRaceStore = (id: string) => {
  const encodedId = id ? btoa(`NKMEMO${id}`) : '';
  const { value, setValue } = useLocalStorage<TRaceStorage>(encodedId, {});

  const getMemo = (key: string) => value[key] ?? '';

  const setMemo = (key: string, text: string) => {
    setValue((prev) => ({ ...prev, [key]: text }));
  };

  return { getMemo, setMemo };
};

export default useRaceStore;
