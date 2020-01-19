export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function makeFetchRequest(url, callback) {
  fetch(url)
    .then(resp => {
      return handleErrors(resp);
    })
    .then(x => {
      return x.json();
    })
    .then(info => {
      console.log(">info>", info);
      callback(info);
    })
    .catch(err => {
      if (err == "TypeError: Failed to fetch") {
        callback({ error: `Cannot make contact with server on ${url}` });
      } else {
        callback({ error: err });
      }
    });
}
