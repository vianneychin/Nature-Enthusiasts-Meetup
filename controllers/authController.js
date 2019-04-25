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
  },
  login: (req, res) => {
    res.render("login.ejs");
  },
  createSession: (req, res) => {
    // Setting a property to session called email
    req.session.email = req.body.email;
    // Setting a logged property to session and setting it to true
    req.session.logged = true;
    // User is now logged in ^^^
    console.log(req.session);
    res.redirect("/events");
  }
};
