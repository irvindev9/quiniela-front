export type Background = {
  id: number;
  name: string;
  url: string;
  size: number;
  type: string;
  dimensions: {width: number, height: number};
  modified: number;
}

export type Backgrounds = {
  [key: number]: Background;
}
