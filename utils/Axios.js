import axios from "axios";

export function get(url, params = {}) {
  return axios({
    method: "get",
    url,
    params
  });
}
