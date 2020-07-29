const express = require('express');
const router = express.Router();


// @Route Get api/posts/
// @Test posts root Route
//@Access Public
router.get('/posts', (req, res) => {
   res.status(200).json({ msg: 'posts roots' })
})

module.exports = router;