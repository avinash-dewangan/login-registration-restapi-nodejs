const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var checkAuth = require("../api/middleware/auth");
const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// image path
// limit: 5mb
// filter : png, jpeg,jpg




//profile update
router.post('/updateProfile/', upload.single('profileImage'), checkAuth, function (req, res, next) {
    console.log(req.file);


    var id = req.body.user_id;
    var profilePic = req.file.path.replace(/\\/g, "/").substring("public".length);;

    userModel.findById(id, function (err, data) {
        data.profileImage = profilePic ? profilePic : data.profileImage;

        data.save()
            .then(doc => {
                res.json({
                    message: "Profile Image updaed Success",
                    result: doc

                });
            })
            .catch(err => {
                res.json(err);
            })
    })
});



//signup
router.post('/signup', (req, res, next) => {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmpassword;


    if (password !== confirmPassword) {
        res.json({
            message: "Password not matched",
        });
        console.log(password + confirmPassword);
    } else {

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return res.json({
                    message: "something went wrong, Try Later",
                    error: err
                });
                console.log(passward + confirmPassward);
            } else {
                //console.log(hash);
                console.log(password + confirmPassword);
                const userDetails = new userModel({
                    username: username,
                    email: email,
                    password: hash,
                })
                //userDetails.save().then((todo) => res.json(todo))
                userDetails.save()
                    .then(doc => {
                        res.status(201).json({
                            message: "user registered Successfully",
                            result: doc
                        });
                    }).catch(err => {
                        res.json(err);
                    });
            }
        });
    }
});


//login
router.post('/login', (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    userModel.find({ username: username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.json({
                    message: "Auth Failed",
                });
            } else {
                // Load hash from your password DB.
                bcrypt.compare(password, user[0].password, function (err, result) {
                    // result == true
                    if (err) {
                        res.status(404).json({
                            message: "Auth Failed",
                        });
                    }
                    if (result) {
                        var token = jwt.sign({
                            username: user[0].username,
                            userid: user[0]._id
                        },
                            process.env.SECRTE_KEY,
                            {
                                expiresIn: "8h"
                            }
                        )
                        res.status(200).json({
                            message: "User Found",
                            token: token
                        });

                    } else {
                        res.json({
                            message: "Auth Failed",
                        });
                    }
                });
            }
        })
        .catch(err => {
            res.json({
                error: err
            });
        })
});


router.get('/sendemail', (req, res, next) => {

    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
                user: 'avinash.dew9@gmail.com', // generated ethereal user
                pass: 'Archi@3467', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <avinash.dew9@gmail.com>', // sender address
            to: "avinash.dew9@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        if (info.messageId) {
            res.send("email send");
        } else {
            res.send("Error with sending email");
        }
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
});


//Data Listing
router.get('/getUserDetails/:id', checkAuth, function (req, res, next) {
    var id = req.params.id;
    userModel.find({ _id: id }, { 'email': 1, profileImage: 1 })
        .then((todos) => res.json(todos))
        .catch((res) => res.json(err));
});







module.exports = router;