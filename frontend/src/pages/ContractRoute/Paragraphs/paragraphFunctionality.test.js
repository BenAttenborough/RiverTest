import React from "react";
import { shallow, mount } from "enzyme";
import * as paragraphFunctionality from "./paragraphFunctionality";
import * as utils from "../../../utils/utils";

// fetchTitle,
//   updateParagraphs,
//   ShowParagraphs,
//   ShowContent

describe("fetchTitle", () => {
  it("Gets response from server and runs provided function with data.attributes.name", done => {
    jest.spyOn(utils, "makeFetchRequest");
    utils.makeFetchRequest.mockImplementation(url => {
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            attributes: {
              name: "A name"
            }
          }
        });
      });
    });
    const mockSetTitle = jest.fn(resp => {
      expect(resp).toBe("A name");
      done();
    });
    paragraphFunctionality.fetchTitle(1, mockSetTitle);
    utils.makeFetchRequest.mockRestore();
  });
});

describe("updateParagraphs", () => {
  it("updateParagraphs with returned data", done => {
    const data = {
      content: [
        {
          id: 1,
          attributes: {
            text: "Some text"
          }
        },
        {
          id: 2,
          attributes: {
            text: "Some more text"
          }
        }
      ]
    };

    const mockSetContent = formattedContent => {
      expect(formattedContent).toEqual([
        { id: 1, text: "Some text" },
        { id: 2, text: "Some more text" }
      ]);
      done();
    };
    paragraphFunctionality.updateParagraphs(data, [], mockSetContent);
  });

  it("Sets EOF to true if last item id is 'EOF'", done => {
    const data = {
      content: [
        {
          id: 1,
          attributes: {
            text: "Some text"
          }
        },
        {
          id: 2,
          attributes: {
            text: "Some more text"
          }
        },
        {
          id: "EOF",
          attributes: {
            text: "Some text"
          }
        }
      ]
    };
    const mockSetContent = () => {};
    const mockSetEOF = resp => {
      expect(resp).toBe(true);
      done();
    };
    paragraphFunctionality.updateParagraphs(
      data,
      [],
      mockSetContent,
      mockSetEOF
    );
  });
});

describe("ShowParagraphs", () => {
  it("renders without crashing", () => {
    shallow(<paragraphFunctionality.ShowParagraphs />);
  });

  it("returns a message warning of no content for page if no content is passed in", () => {
    const wrapper = shallow(<paragraphFunctionality.ShowParagraphs />);
    expect(
      wrapper.contains(<li>There is no content for specified page</li>)
    ).toBe(true);
  });

  it("returns three list items if props.content contains three valid objects", () => {
    const content = [
      {
        id: 1,
        text: "Some text"
      },
      {
        id: 2,
        text: "Some text2"
      },
      {
        id: 3,
        text: "Some text3"
      }
    ];
    const wrapper = shallow(
      <paragraphFunctionality.ShowParagraphs content={content} />
    );
    expect(wrapper.contains(<li>Some text</li>)).toBe(true);
    expect(wrapper.contains(<li>Some text2</li>)).toBe(true);
    expect(wrapper.contains(<li>Some text3</li>)).toBe(true);
  });
});
