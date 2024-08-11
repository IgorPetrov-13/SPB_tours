export type TypeUser = {
  id: number;
  name: string;
  email: string;
};

export type TypeRoad = {
  id: number;
  title: string;
  mapLink: string;
  length: number;
  description: string;
  userId: number;
};

export type TypeRegistration = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export type TypeAuth = {
  email: string;
  password: string;
};

export type TypeRoads = TypeRoad[];
