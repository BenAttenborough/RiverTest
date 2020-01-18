import React from "react";
import { shallow, mount } from "enzyme";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "whatwg-fetch";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";
import Home from "./Home";
import { HandleData, DisplayContracts } from "./Home";

it("renders without crashing", () => {
  shallow(<Home />);
});

it("renders a title on the homepage", () => {
  const wrapper = shallow(<Home />);
  const title = <h2>Home</h2>;
  expect(wrapper.contains(title)).toEqual(true);
});

// it("Should fetch an array of contacts", () => {
//   jest.spyOn(React, "useEffect").mockImplementation(f => {
//     //   return f();
//     // return async function() {
//     //   console.log("Running");
//     //   const result = await f();
//     //   console.log("result", result);
//     // };

//     function mockFn() {
//       console.log("FFFFF");

//       setData({ error: "err" });
//     }

//     return mockFn();
//   });

//   let wrapper = mount(<Home />);

//   //   jest.spyOn(wrapper.instance(), "makeFetchRequest", fn => {
//   //     console.log("makeFetchRequest called");
//   //     return fn;
//   //   });

//   //   console.log("Wrapper", wrapper.debug());
// });

let data = [
  {
    data: {
      type: "contracts",
      id: "dc89ff49-8449-11e7-ac1d-3c52820efd20",
      attributes: {
        name: "Dummy Contract"
      }
    },
    relationships: {
      paragraphs: {
        links: {
          self: "/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs"
        }
      }
    }
  },
  {
    data: {
      type: "contracts",
      id: "dc89ff49-8449-11e7-ac1d-3c52820efd21",
      attributes: {
        name: "Apple Media Services Terms and Conditions"
      }
    },
    relationships: {
      paragraphs: {
        links: {
          self: "/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs"
        }
      }
    }
  }
];

describe("HandleData", () => {
  let wrapper;

  it("displays contracts if data recieved", () => {
    wrapper = shallow(<HandleData data={data} />);
    expect(wrapper.find(DisplayContracts)).toHaveLength(1);
  });

  it("displays an error message if no contracts found", () => {
    wrapper = shallow(<HandleData data={{ error: "Error Message" }} />);
    expect(wrapper.contains(<p>Error: Error Message</p>)).toBe(true);
  });
});

describe("DisplayContracts", () => {
  let wrapper;
  it("displays Dummy contract link", () => {
    wrapper = shallow(<DisplayContracts contracts={data} />);
    expect(
      wrapper.contains(
        <li>
          <a href="/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs">
            Dummy Contract
          </a>
        </li>
      )
    ).toBe(true);
  });

  it("displays Apple contract link", () => {
    wrapper = shallow(<DisplayContracts contracts={data} />);
    expect(
      wrapper.contains(
        <li>
          <a href="/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs">
            Apple Media Services Terms and Conditions
          </a>
        </li>
      )
    ).toBe(true);
  });
});
