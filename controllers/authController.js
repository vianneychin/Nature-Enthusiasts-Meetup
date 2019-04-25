module.exports = {
  test: (req, res) => {
    console.log("=========================");
    console.log(req.session);
    console.log("=========================");
    req.session.myOwnPropertyIMadeUp = "Cheese";
    console.log("=========================");
    console.log(req.session);
    console.log("=========================");
    res.send("hi test");
  }
};
