import axios from "./axios";

export function getSingerDetail(id) {
  return axios({
    url: "/artist",
    params: {
      id
    }
  });
}

export function getSongs(id) {
  return axios({
    url: "song/artist",
    params: {
      id
    }
  });
}