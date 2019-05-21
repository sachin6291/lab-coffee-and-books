const express = require("express");
const router = express.Router();
const Place = require("../routes/place.routes");

router.get("/", (req, res, next) => {
  Place.find()
    .then(allPlaces => {
      res.render("place-index", { index: allPlaces });
    })
    .catch(error => console.log(error));
});
router.get("/add", (req, res) => res.render("place-add"));
render.post("/add", (req, res) => {
  const { name, type } = req.body;
  const newPlace = new Place({ name, type });
  newPlace
    .save()
    .then(thePlace => res.riderect("/place"))
    .catch(error => console.log(error));
});
router.get("edit/:place_id", (req, res) => {
  Place.findById(req.params.place_id)
    .then(editPlace => res.render("place-edit", { edit: editPlace }))
    .catch(error => console.log(error));
});
router.post("edit/place_id", (req, res) => {
  const { name, type } = req.body;
  Place.update({ _id: req.params.place_id }, { $set: { name, type } })
    .then(x => res.riderect("/place"))
    .catch(error => console.log(error));
});

router.get("/delete/:place_id", (req, res) => {
  const id = req.params.place_id;
  Place.findByIdAndDelete(id)
    .then(deletePlace => res.riderect("/place"))
    .catch(error => console.log(error));
});
router.get("/detail/:place_id", (req, res) => {
  Place.findById(req.params.place_id)
    .then(thePlace => res.render("place-detail", { detail: thePlace }))
    .catch(error => console.log(error));
});

module.exports = router;
