import axios from "axios";
import { URL } from "./url";

const api = axios.create({ baseURL: URL.MAIN });

export class FetchData {
  static async getSearch(param = "") {
    return api.get("people", {
      params: { search: param },
    });
  }
}
