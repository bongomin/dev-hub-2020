const express = require('express');
const router = express.Router();


// @Route Get api/users/
// @Test Users root Route
//@Access Public
router.get('/', (req, res) => {
   res.status(200).json({ msg: 'users root' })
})

module.exports = router;