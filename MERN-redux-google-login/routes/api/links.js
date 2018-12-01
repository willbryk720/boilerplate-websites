const express = require("express");
const router = express.Router();

// Load models
const Link = require("../../models/Link");
const User = require("../../models/User");

const { sortByVotesDescending } = require("../../server_utils/utils");

// @route   GET api/links/:categoryID
// @desc    Get links under a category filtered by filters and ordered according up/down votes formula
router.get("/:categoryID", (req, res) => {
  if (!req.user) return res.status(404).json({ errorMsg: "Not logged in" });

  const errors = {};

  const categoryID = req.params.categoryID;

  Link.find({
    categoryID: categoryID
  })
    .populate("userCreator")
    .then(linkArray => {
      if (!linkArray) {
        return res
          .status(404)
          .json({ errorMsg: "There are no links in this category" });
      }

      linkArray.sort(sortByVotesDescending);

      // const linkIDs = linkArray.map(q => q._id);

      // Description.aggregate([
      //   {
      //     $match: {
      //       linkID: { $in: linkIDs }
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "userCreator",
      //       foreignField: "_id",
      //       as: "userCreator"
      //     }
      //   },
      //   { $unwind: "$userCreator" },
      //   {
      //     $group: {
      //       _id: "$linkID",
      //       descriptions: { $push: "$$ROOT" }
      //     }
      //   }
      // ])
      //   .then(descriptionsArray => {
      //     descriptionsArray.sort(sortByVotesDescending);

      //     const questionsAndResponses = getQuestionsResponsesObject(
      //       questionArray,
      //       responsesArray
      //     );
      //     res.json(questionsAndResponses);
      //   })
      //   .catch(err =>
      //     res.status(404).json({ errorMsg: "Problem fetching data" })
      //   );
    })
    .catch(err =>
      res.status(404).json({ errorMsg: "There are no links in this category" })
    );
});

// @route   POST api/questions/link/delete
// @desc    Delete link
router.post("/link/delete", (req, res) => {
  if (!req.user) return res.status(404).json({ errorMsg: "Not logged in" });

  var isValid = true;

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // TODO validation
  // Once validation is done, can proceed

  // Delete Link
  Link.findById(req.body.linkID)
    .then(link => {
      if (req.user.id != link.userCreator) {
        return res.status(404).json({
          errorMsg:
            "You don't have permission to delete this because you didn't create it"
        });
      }

      // if the user did create the link, then delete
      link
        .remove()
        .then(() => {
          return res.json({
            status: "success"
          });
        })
        .catch(err => {
          return res.status(404).json({ errorMsg: "Error with deleting link" });
        });
    })
    .catch(err =>
      res.status(404).json({ errorMsg: "Link not found with that id" })
    );
});

module.exports = router;
