import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "whatwg-fetch";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";
import Home from "./Home";

// describe("useDataApi", () => {
//   beforeAll(() => {
//     global.fetch = fetch;
//   });
//   afterAll(() => {
//     fetchMock.restore();
//   });

//   it("should return data with a successful request", async () => {
//     const { result } = renderHook(() => Home());
//     console.log("result", result);
//     // fetchMock.mock("test.com", {
//     //   returnedData: "foo"
//     // });
//     // await act(async () => {
//     //   result.current.Home();
//     // });

//     // console.log("result.current.data", result.current.data);

//     // expect(result.current.data).toBe({
//     //   returnedData: "foo"
//     // });
//   });
// });

it("renders without crashing", () => {
  shallow(<Home />);
});

it("renders a title on the homepage", () => {
  const wrapper = shallow(<Home />);
  const title = <h2>Home</h2>;
  expect(wrapper.contains(title)).toEqual(true);
});

// it("Should fetch an array of contacts", () => {
//   const mockSuccessResponse = {};
//   const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
//   const mockFetchPromise = Promise.resolve({
//     // 3
//     json: () => mockJsonPromise
//   });
//   jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

//   const wrapper = shallow(<Home />);

//   expect(global.fetch).toHaveBeenCalledTimes(1);
//   expect(global.fetch).toHaveBeenCalledWith(
//     "https://url-of-your-server.com/example/json"
//   );
// });

// it("App loads with initial state of 0", () => {
//   const { container } = render(<Home />);
//   const countValue = getByTestId(container, "data");
//   expect(countValue.textContent).toBe("0");
// });

it("Should fetch an array of contacts", () => {
  jest.spyOn(React, "useEffect").mockImplementation(f => {
    console.log("FFFFF");
    return f();
  });

  let wrapper = shallow(<Home />);

  //   jest.spyOn(wrapper.instance(), "makeFetchRequest", fn => {
  //     console.log("makeFetchRequest called");
  //     return fn;
  //   });

  console.log("Wrapper", wrapper.debug());
  expect(wrapper.contains("Home")).toEqual(true);
});
