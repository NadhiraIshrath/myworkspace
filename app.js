var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    passportLocalMongoose = require("passport-local-mongoose");

// User = require("./models/user");

mongoose.connect('mongodb+srv://Nadhira:nadhi_134@cluster0-rvthp.mongodb.net/sample?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
seedDB();
//Passport configuration
app.use(require("express-session")({
    secret: "Passwords are the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//SCHEMA SETUP

// Campground.create({
//     name: "Anna Djokovic",
//     image: "https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     description: "This is the most popular camground where you will feel alive."
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEW CAMPGROUND");
//         console.log(campground);
//     }
// });
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();

});
app.get("/", function(req, res) {
    // response.send("New page");
    res.render("landing");
});
app.get("/campgrounds", function(req, res) {
    // req.user
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });
    //res.render("campgrounds", { campgrounds: campgrounds });
});
app.post("/campgrounds", function(req, res) {
    //get data from form and add to cg array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampgrounds = { name: name, image: image, description: desc }
    Campground.create(newCampgrounds, function(err, newlycreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

    //redirect to home 
    // res.send("POSTED!!");

});
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
    // res.render("show");
});
//comments routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            redirect("/campgrounds");
        } else {
            // console.log(req.body.comments);
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });

});
//auth routes
//register form
app.get("/register", function(req, res) {
    res.render("register");
});
//sign up logic

app.post("/register", function(req, res) {
    // res.send("Signing up");
    // var newUser = new User({ username: req.body.name });
    // User.register(newUser, req.body.password, function(err, user) {
    //     if (err) {
    //         console.log(err);
    //         return res.render("register");
    //     }
    //     passport.authenticate("local")(req, res, function() {
    //         res.redirect("/campgrounds");
    //     });
    // });
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");

        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
app.listen(3000, function() {
    console.log("YELPCAMP SERVER HERE!!");
});