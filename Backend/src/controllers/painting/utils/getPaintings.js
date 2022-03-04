const { Painting, Artist, Technique, Photo } = require("../../../db");

const getPaintings = async (condition, techniqueCondition) => {
  const paintings = await Painting.findAll({
    ...condition,
    attributes: [
      "id",
      "title",
      "description",
      "orientation",
      "height",
      "width",
      "price",
    ],
    include: [
      {
        ...techniqueCondition,
        model: Technique,
        through: {
          attributes: [],
        },
        attributes: ["id", "name", "description"],
      },
      {
        model: Artist,
        attributes: ["id", "name", "biography", "photo", "email", "score"],
      },
      {
        model: Photo,
        attributes: ["url"],
      },
    ],
  });
  return paintings;
};

module.exports = getPaintings;