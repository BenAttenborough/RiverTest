import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";
import { HandleData, DisplayContracts } from "./Home";
import { Link } from "react-router-dom";

it("renders without crashing", () => {
  shallow(<Home />);
});

it("renders a title on the homepage", () => {
  const wrapper = shallow(<Home />);
  const title = <h2>Home</h2>;
  expect(wrapper.contains(title)).toEqual(true);
});

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

  it("returns the DisplayContracts componet data recieved", () => {
    wrapper = shallow(<HandleData data={data} />);
    expect(wrapper.find(DisplayContracts)).toHaveLength(1);
  });

  it("displays an error message if no contracts found", () => {
    wrapper = shallow(<HandleData data={{ error: "Error Message" }} />);
    expect(wrapper.contains(<p>Error: Error Message</p>)).toBe(true);
  });
});

describe("DisplayContracts", () => {
  let wrapper = shallow(<DisplayContracts contracts={data} />);

  it("displays 'Dummy Contract' title if passed in", () => {
    expect(wrapper.contains("Dummy Contract")).toBe(true);
  });

  it("displays 'Dummy Contract' paragraphs link", () => {
    expect(
      wrapper.contains(
        <Link to="/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs">
          View content
        </Link>
      )
    ).toBe(true);
  });

  it("displays 'Apple Media Services Terms and Conditions' title if passed in", () => {
    expect(wrapper.contains("Apple Media Services Terms and Conditions")).toBe(
      true
    );
  });

  it("displays 'Apple' paragraphs link", () => {
    expect(
      wrapper.contains(
        <Link to="/contract/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs">
          View content
        </Link>
      )
    ).toBe(true);
  });
});
