const artistDoThis = (req,res) => {
     res.status(201).json({ result: 'This works' });
 };


 module.exports = { artistDoThis };
