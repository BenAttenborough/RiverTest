export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function makeFetchRequest(url) {
  return fetch(url)
    .then(resp => {
      return handleErrors(resp);
    })
    .then(x => {
      return x.json();
    })
    .catch(err => {
      //   return err;
      if (err == "TypeError: Failed to fetch") {
        return { error: `Cannot make contact with server on ${url}` };
      } else {
        return { error: err };
      }
    });
}
