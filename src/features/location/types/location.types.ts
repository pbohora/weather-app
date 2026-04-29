export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  id: number | string;
  name: string;
  country: string;
  admin1?: string | undefined;
  admin2?: string | undefined;
}
