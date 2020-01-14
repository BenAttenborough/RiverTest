var express = require("express");
var router = express.Router();
var contract1 = require("../data/contract1.js");

const contract2 = {
  data: {
    type: "contracts",
    id: "ddd2222",
    attributes: {
      name: "Contract Two Name"
    }
  },
  relationships: {
    paragraphs: {
      links: {
        self: "/contracts/ddd2222/paragraphs"
      }
    }
  }
};

const contracts = [contract1, contract2];

function getMetaData(contract) {
  const { data, relationships } = contract;
  return {
    data,
    relationships
  };
}

function getParagraphs(contract, page, pageSize) {
  const { content } = contract;
  return { content };
}

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function(req, res, next) {
  res.send(contract);
});

router.get("/contract/:contractID", function(req, res) {
  // res.send(req.params);

  const { contractID } = req.params;
  const foundContract = contracts.find(ele => ele.data.id === contractID);
  if (foundContract) {
    res.send(getMetaData(foundContract));
  } else {
    res.status(404).send("Not found");
  }

  // res.send(`Contract id from server: ${contractID}`);
  // res.send(`Contract name: ${contract.data.attributes.name}`);
});

router.get("/contract/:contractID/paragraphs", function(req, res) {
  // res.send(req.params);

  const { contractID } = req.params;
  const foundContract = contracts.find(ele => ele.data.id === contractID);
  if (foundContract) {
    res.send(getParagraphs(foundContract));
  } else {
    res.status(404).send("Not found");
  }

  // res.send(`Contract id from server: ${contractID}`);
  // res.send(`Contract name: ${contract.data.attributes.name}`);
});

module.exports = router;
