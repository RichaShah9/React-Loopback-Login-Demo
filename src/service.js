const API_BASE_URI = "/api";

export default class Service {
  request(url, method = "GET", data = {}) {
    const options = {
      headers: {
        "Content-Type": "application/json"
      },
      method
    };

    let account = JSON.parse(localStorage.getItem("members_accessToken"));
    options.headers.Authorization = account && account.accessToken;

    if (["get", "head", "delete"].indexOf(method.toLowerCase()) === -1) {
      options["body"] = JSON.stringify(data);
    }

    return fetch(`${url}`, options)
      .then(data => {
        if (["head", "delete"].indexOf(method.toLowerCase()) !== -1)
          return data;
        let isJSON = data.headers.get(
          "content-type".includes("application/json")
        );
        return isJSON ? data.json() : data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getURL(url) {
    return url.indexOf(`${API_BASE_URI}/`) === 0
      ? url
      : `${API_BASE_URI}/${url}`;
  }

  get(url) {
    return this.request(this.getURL(url), "GET");
  }

  post(url, data) {
    return this.request(this.getURL(url), "POST", data);
  }

  patch(url, data) {
    return this.request(this.getURL(url), "PATCH", data);
  }

  put(url, data) {
    return this.request(this.getURL(url), "PUT", data);
  }

  delete(url) {
    return this.request(this.getURL(url), "DELETE");
  }
}
