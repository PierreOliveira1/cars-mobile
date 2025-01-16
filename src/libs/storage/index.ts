import { MMKV } from "react-native-mmkv";

const mmkv = new MMKV();

export const storage = {
  set(key: string, value: string | number | boolean) {
    mmkv.set(key, value);
  },
  getString(key: string) {
    return mmkv.getString(key);
  },
  getNumber(key: string) {
    return mmkv.getNumber(key);
  },
  getBoolean(key: string) {
    return mmkv.getNumber(key);
  },
  delete(key: string) {
    mmkv.delete(key);
  },
  deleteMany(...keys: string[]) {
    keys.forEach((key) => mmkv.delete(key));
  },
  contains(key: string) {
    return mmkv.contains(key);
  },
};
