const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userCtrl = require('../controllers/user.js')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.delete('/delete/:uuid', userCtrl.deleteProfile)

module.exports = router;