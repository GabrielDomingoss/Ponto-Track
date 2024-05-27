// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      phone: string;
      birth: string;
      address: string;
      password: string;
    };
    vehicles: {
      id: string;
      board: string;
      model: string;
      brand: string;
      year: number;
      color: string;
    };
    users_vehicles: {
      user_id: string;
      vehicle_id: string;
    };
  }
}
