import React from "react";
import { shallow, mount } from "enzyme";
import Controls from "./Controls";

describe("Controls", () => {
  it("renders without crashing", () => {
    shallow(<Controls />);
  });
});
