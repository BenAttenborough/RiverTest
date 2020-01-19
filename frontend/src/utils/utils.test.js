import { makeFetchRequest } from "./utils";
import "jest-fetch-mock";

describe("makeFetchRequest", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("make dummy fetch request", () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
    makeFetchRequest("https://google.com").then(res => {
      expect(res.data).toEqual("12345");
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("https://google.com");
  });
  //   it("makes BAD dummy fetch request", () => {
  //     fetch.mockReject(new Error("fake error message"));
  //     makeFetchRequest("https://google.com").then(res => {
  //       expect(res.error.length).toBe("[Error: fake error message]");
  //     });
  //     expect(fetch.mock.calls.length).toEqual(1);
  //     expect(fetch.mock.calls[0][0]).toEqual("https://google.com");
  //   });
});
