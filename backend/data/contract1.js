const contract = {
  data: {
    type: "contracts",
    id: "dc89ff49-8449-11e7-ac1d-3c52820efd20",
    attributes: {
      name: "Contract Name"
    }
  },
  relationships: {
    paragraphs: {
      links: {
        self: "/contracts/dc89ff49-8449-11e7-ac1d-3c52820efd20/paragraphs"
      }
    }
  },
  content: [
    {
      type: "contract-paragraphs",
      id: "0d60b462-2b98-11e8-97a1-080027a8df8b",
      attributes: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
      }
    },
    {
      type: "contract-paragraphs",
      id: "0d60b462-2b98-11e8-97a1-080027a8df8a",
      attributes: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
      }
    }
  ]
};

module.exports = contract;
