import React from "react";
import { shallow } from "enzyme";
import { Paragraphs } from "./Paragraphs";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

describe("Paragraphs", () => {
  it("renders without crashing", () => {
    const history = createMemoryHistory();
    shallow(
      <Router history={history}>
        <Paragraphs />
      </Router>
    );
  });

  it("shows holding page while waiting to fetch data", () => {
    const history = createMemoryHistory();

    const wrapper = shallow(
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
