export type Province = {
  id: string;
  name: string;
};

export type County = {
  id: string;
  provinceId: string;
  name: string;
};
