//Reference:https://github.com/hunterjorgensen167/webdev_fullstack
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const hasReadList = [{bookId: "1234", authors: ["Enid Blyton"], title: "Secret Seven"}];
router.get('/', (req, res) => res.send(hasReadList));

router.post('/', (req, res) => {
    const body = req.body;
    const bookId = uuidv4();
    hasReadList.push({
        bookId: body.id,
        authors: body.authors,
        title: body.title,
    });
    res.status(200).send({message: 'Success!', bookId: body.bookId});
});

router.get('/:bookId', function (req, res) {
    const bookIdSearch = req.params.bookId;
    const foundBook = hasReadList.find(bookItem => bookItem.bookId === bookIdSearch);
    if (foundBook) {
        return res.send(foundBook)
    }

    res.status(404);
    res.send({error: 'No book found!'});
});

// Notice how we include the ID in the header
// Because we are saying that this is REQUIRED
// Same for delete
// router1.put('/:foodId', (req, res) => {
//     const foodId = req.params.foodId;
//     const foodBody = req.body;
//     const foundFood = foodList.find((foodItem) => foodItem.foodId === foodId);
//     if (!foundFood) {
//         res.status(404);
//         return res.send({error: 'Food not found!'});
//     }
//
//     foundFood.name = foodBody.name;
//     foundFood.color = foodBody.color;
//     foundFood.shape = foodBody.shape;
//
//     res.status(200).send('Success!');
// });

// DELETE requests can take a body, but we
// can typically handle the request with
// just the ID
router.delete('/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    for (var i = hasReadList.length - 1; i >= 0; i--) {
        if (hasReadList[i].bookId === bookId) {
            hasReadList.splice(i, 1);
        }
    }
    res.status(200).send(hasReadList);
});

module.exports = router;