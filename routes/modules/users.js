const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  // 驗證傳入資料，若有問題回到註冊畫面修正重填
  if (!email) {
    errors.push({ message: 'Email欄位為必填。' })
  }
  if (!password) {
    errors.push({ message: '密碼欄位為必填。' })
  }
  if (!confirmPassword) {
    errors.push({ message: '確認密碼欄位為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      console.log('User already exists.')
      errors.push({ message: '這個email已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 如果還沒註冊：寫入資料庫
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

module.exports = router