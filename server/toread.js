//Reference:https://github.com/hunterjorgensen167/webdev_fullstack
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const toReadList = [{bookId: "1234", authors: ["Enid Blyton"], title: "Famous Five"}];
router.get('/', (req, res) => res.send("Hello world"));

router.post('/', (req, res) => {
    const body = req.body;
    const bookId = uuidv4();
    toReadList.push({
        bookId: body.id,
        authors: body.authors,
        title: body.title,
    });
    res.status(200).send({message: 'Success!', bookId: body.id});
});

router.get('/:bookId', function (req, res) {
    const bookIdSearch = req.params.bookId;
    const foundBook = toReadList.find(foodItem => foodItem.bookId === bookIdSearch);
    if (foundBook) {
        return res.send(foundBook)
    }

    res.status(404);
    res.send({error: 'No book found!'});
});

// Notice how we include the ID in the header
// Because we are saying that this is REQUIRED
// Same for delete
/*router.put('/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const bookBody = req.body;
    const foundBook = toReadList.find((foodItem) => foodItem.bookId === bookId);
    if (!foundBook) {
        res.status(404);
        return res.send({error: 'Book not found!'});
    }

    foundBook.name = bookBody.name;
    foundBook.color = bookBody.color;
    foundBook.shape = bookBody.shape;

    res.status(200).send('Success!');
});*/

// DELETE requests can take a body, but we
// can typically handle the request with
// just the ID
router.delete('/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    console.log("In delete route");
    for (let i = toReadList.length - 1; i >= 0; i--) {
        console.log(toReadList[i].bookId)
        if (toReadList[i].bookId === bookId) {
            toReadList.splice(i, 1);
        }
    }
    //Sending out the list of books after deleting so that the view can be updated
    res.status(200).send(toReadList);
});

module.exports = router;