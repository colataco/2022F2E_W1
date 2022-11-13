export interface GlobalContextType {
  lang: string;
  setLang: (s: string) => any;
  token: string;
  isLogin: () => boolean;
  setToken: (s: string) => any;
}
