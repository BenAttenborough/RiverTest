import React from "react";
import { shallow, mount } from "enzyme";
import { Paragraphs } from "./Paragraphs";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

describe("Paragraphs", () => {
  // const mockUseParams = jest.fn(() => 1)

  it("renders without crashing", () => {
    const history = createMemoryHistory();
    const wrapper = shallow(
      <Router history={history}>
        <Paragraphs />
      </Router>
    );
  });

  it("shows holding page while waiting to fetch data", () => {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Router history={history}>
        <Paragraphs />
      </Router>
    );
    expect(
      wrapper.contains(
        <div>
          <h2>...</h2>
          <p>Starting page: 1</p>
          <p>Fetching 5 paragraphs at a time</p>
          Fetching data
        </div>
      )
    );
  });
});
