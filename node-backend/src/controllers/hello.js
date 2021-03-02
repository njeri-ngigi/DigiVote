module.exports = {
  sayHello(req, res) {
    res.send({ message: 'Hello World! Use /api/v1 to view the routes' });
  },
};
