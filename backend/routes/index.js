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

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function(req, res, next) {
  res.send(contract);
});

module.exports = router;
