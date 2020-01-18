export function handleErrors(response) {
  console.log("xy", response);
  if (!response.ok) {
    console.log("NOT OK!");
    throw Error("foo");
  }
  return response;
}
