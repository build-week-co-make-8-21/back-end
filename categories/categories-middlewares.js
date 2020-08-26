module.exports = {validateCategoryName, checkIfCategoryExists};

function validateCategoryName(req, res, next) {
  if (!req.body.categoryName) {
    res.status(400).json({ message: "No category name provided" })
  } else {
    next();
  }
};

function checkIfCategoryExists(req, res, next) {
  const { categoryName } = req.body;

  db("categories").where({ categoryName }).first()
    .then(category => {
      if (category) {
        return res.status(401).json({ message: `The category ${categoryName} already exists. Please create a unique category` })
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something failed while adding this category", err: err.message });
    });
};