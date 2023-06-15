const router = require('express').Router();
let payment_Schema = require('../models/payment');

router.route('/addpayment').post((req, res) => {
    const { code, stdNo, subject, classType, email, date, picture, realPrice } = req.body;
    const payment = new payment_Schema({ code, stdNo, subject, classType, email, date, picture, realPrice });
    payment.save()
        .then(() => res.json('Payment Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatepayment/").put(async (req, res) => {
    const { code, stdNo, subject, classType, email, date, picture, realPrice } = req.body;

    const payment = {
        code, stdNo, subject, classType, email, date, picture, realPrice
    }
    const update = await payment_Schema.findOneAndUpdate({ code: code }, payment).then(() => {
        res.status(200).send({ status: "Payment Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/deletepayment/:code").delete(async (req, res) => {
    let code = req.params.code;
    payment_Schema.findOneAndDelete({ code: code })
        .then(() => {
            res.status(200).send({ status: "Payment Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allpayment").get(async (req, res) => {
    payment_Schema.find()
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/allpayment/:searchName").get(async (req, res) => {
    payment_Schema.find({ stdNo: req.params.searchName })
        .then(productTyr => res.json(productTyr))
        .catch(err => res.status(400).json('No Data'))
});


module.exports = router;