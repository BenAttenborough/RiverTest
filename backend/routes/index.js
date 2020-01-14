var express = require("express");
var router = express.Router();

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
  }
};

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

const contracts = [contract, contract2];

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
    res.send(foundContract);
  } else {
    res.status(404).send("Not found");
  }

  // res.send(`Contract id from server: ${contractID}`);
  // res.send(`Contract name: ${contract.data.attributes.name}`);
});

module.exports = router;
