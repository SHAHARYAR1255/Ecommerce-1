const express = require('express');
const router = express.Router();
const {database} = require('../config/helper');
const crypto = require('crypto');

// GET ALL ORDERS
router.get('/', (req, res) => {
    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.order_id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.Prod_id = od.prod_id'
            },
            {
                table: 'users as u',
                on: 'u.user_id = o.user_id'
            }
        ])
        .withFields(['o.order_id', 'p.Prod_name', 'p.Price', 'u.username'])
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
});

//Get Single Order
router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    console.log(orderId);

    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.order_id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.Prod_id = od.prod_id'
            },
            {
                table: 'users as u',
                on: 'u.user_id = o.user_id'
            }
        ])
        .withFields(['o.order_id', 'p.Prod_name as name', 'p.Price', 'u.username'])
        .filter({'o.order_id': orderId})
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.json({message: `No orders found with orderId ${orderId}`});
            }
        }).catch(err => res.json(err));
});


// // Place New Order

/* send post request of
{
    "userId": "6",
  "productName" : "shirt"
}
*/
router.post('/new', (req, res) => {
    let {userId, productName } = req.body;
    
    console.log(userId);
    res.json({message: `new order of ${productName} is placed of userId ${userId}`})
})
//    


module.exports = router;
