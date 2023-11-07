import axios from "axios";
import { URL } from "./url";

const api = axios.create({ baseURL: URL.MAIN });

export class FetchData {
  static async getSearch(search = "", page = "") {
    return api.get("people", {
      params: { search: search, page: page },
    });
  }
}
