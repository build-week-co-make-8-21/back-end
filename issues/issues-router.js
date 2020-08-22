const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('issues');
})

module.exports = router;