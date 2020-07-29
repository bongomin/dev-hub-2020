const express = require('express');
const router = express.Router();


// @Route Get api/profile/
// @Test profile root Route
//@Access Public
router.get('/profile', (req, res) => {
   res.status(200).json({ msg: 'profile root' })
})

module.exports = router;