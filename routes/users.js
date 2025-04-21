const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const user = require("../data/users")
const { secret } = require("../crypto/config")
const router = express.Router()



router.post("/login", (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username)

    if(!user) {
        return res.status(401).json({ message: "Contraseñas Incorrecta" })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secret, {expiresIn: "1h" })

    res.json({ message: "Contraseña Correcta", token })
})

router.get("/dashboard", (req, res) => {
    const token = req.header.authorization?.split("")[1]

    if(!token) {
        return res.status(401).json({ message: "no hya token" })
    }

    try {
        const decoded = jwt.verify(token, secret)
        res.json({ message: `Accesos correctos, ${decoded.username}`})
    } catch (error) {
        res.status(401).json({ message: "Token no válido o expirado" })
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.json({ message: "Log out" })
})

module.exports = router