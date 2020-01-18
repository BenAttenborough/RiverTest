var express = require("express");
var router = express.Router();
var contract1 = require("../data/appleContract.js");
var contract2 = require("../data/dummyContract.js");

// const contract2 = {
//   data: {
//     type: "contracts",
//     id: "ddd2222",
//     attributes: {
//       name: "Contract Two Name"
//     }
//   },
//   relationships: {
//     paragraphs: {
//       links: {
//         self: "/contracts/ddd2222/paragraphs"
//       }
//     }
//   }
// };

const contracts = [contract1, contract2];

function getMetaData(contract) {
  const { data, relationships } = contract;
  return {
    data,
    relationships
  };
}

function getParagraphs(contract, page, pageSize) {
  if (page < 1) {
    return {};
  }
  const { content } = contract;
  let numPars = content.length;
  let startPar = (page - 1) * pageSize;
  let limit = page * pageSize;
  let endOfPars = false;
  console.log("numPars", numPars);
  console.log("startPar", startPar);

  // if startPar > numPars then this page does not exist
  if (startPar > numPars) {
    return {};
  }
  // if limit > numPars then set limit to match numPars and flag this is the end of the file
  if (limit >= numPars) {
    limit = numPars;
    endOfPars = true;
  }
  console.log("limit", limit);
  let selectedPars = [];
  for (let i = startPar; i < limit; i++) {
    selectedPars.push(content[i]);
  }
  if (endOfPars) {
    selectedPars.push({
      type: "EOF",
      id: "EOF",
      attributes: {
        text: "End of content"
      }
    });
  }
  return { content: selectedPars, page, pageSize };
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
  const { page, pageSize } = req.query;
  console.log("req.query", req.query);
  console.log("contractID", contractID);
  console.log("page", page);
  console.log("pageSize", pageSize);
  const foundContract = contracts.find(ele => ele.data.id === contractID);
  if (foundContract) {
    res.send(getParagraphs(foundContract, page, pageSize));
  } else {
    res.status(404).send("Not found");
  }

  // res.send(`Contract id from server: ${contractID}`);
  // res.send(`Contract name: ${contract.data.attributes.name}`);
});

router.get("/contracts", function(req, res) {
  res.send(contracts.map(contract => getMetaData(contract)));
});

module.exports = router;
