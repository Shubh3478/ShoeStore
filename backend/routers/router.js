const express = require('express')
const router = express.Router();
const addUser = require('../controls/adduser')
const findUser = require('../controls/fetch')
const updateUser = require('../controls/update')
const updatePassword = require('../controls/change')
const forgetPassword = require('../controls/forgetpassword')
const deleteAccount = require('../controls/delete')


router.post('/signup', addUser)
router.post('/login', findUser)
router.put('/update', updateUser)
router.put('/changepassword', updatePassword)
router.post('/forget-password', forgetPassword)
router.delete('/delete', deleteAccount)


module.exports = router;
