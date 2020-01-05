var express =require("express");
var app = express(),
  bodyParser             =  require("body-parser"),
  passport               =  require("passport"),
  LocalStrategy          =  require("passport-local"), 
  methodOverride         =  require("method-override"),
  session                =  require("express-session"),
  flash                  =  require("connect-flash");
 const server = app.listen(process.env.PORT||5000,function(){
    console.log("ONLINE");
  });
var currentUser="null";
var countdown=0;
var count=0;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));               
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
  secret: "process.env.SESSIONSECRET",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());                                
app.use(passport.session()); 


  
app.use(bodyParser.urlencoded({extended:true}));                
app.set("view engine","ejs");

app.use((req, res, next) => {
 
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.get('/',(req,res) => {
  res.render("landing");
});


app.get('/solider',(req,res) => {
  res.render("soliderlogin");
});
app.get('/terrorist',(req,res) => {
  res.render("terroristlogin");
});

app.post('/solider', function(req, res){
if((req.body.username==="solider@thetarzanway.com") && (req.body.password==="solider"))
{ 
currentUser="S";
console.log(currentUser);
res.redirect("/soliderinput");
}
else
{
res.redirect("/");
}
}
);
app.get('/terroristinput',isLoggedIn,(req,res) => {
res.render("terroristinput");
});
app.post('/terrorist', function(req, res){
if((req.body.username=="terrorist@thetarzanway.com") && (req.body.password=="terrorist"))
{ currentUser="T";
console.log(currentUser);
res.redirect("/terroristinput");
}
else
{res.redirect("/");
}
}
);

app.post('/terroristinput',isLoggedIn, function(req, res){
countdown=req.body.countd;
count=req.body.countd;
var isPrime = function(n) {
    var result = true;
    
    if (n <= 1) {
        result = false;
    }
    else {
        // We only need to check up to the sqrt of the number.
        for (var i=2; i*i<=n; i++) {
            if (n % i === 0) {
                // This number is evenly divisible by i, so it is not prime.
                result = false;
                break;
            }
        }
    }
    
    return result;
}



    var result = 0;
    
    for (var i=0; i<count; i++) {
        if (isPrime(i)) {
            result++;
          
        } }
console.log(result);
res.render("bombpage",{countdown:countdown,currentUser:currentUser,count:count,result:result,currentUser:currentUser});
    var timer = countdown;
    setInterval(function () {

        if (--timer < 0) {
           countdown=0;
        }
countdown=--timer;
    }, 1000);


}
);
app.get('/soliderinput',isLoggedInAsS,(req,res) => {
var isPrime = function(n) {
    var result = true;
    
    if (n <= 1) {
        result = false;
    }
    else {
        // We only need to check up to the sqrt of the number.
        for (var i=2; i*i<=n; i++) {
            if (n % i === 0) {
                // This number is evenly divisible by i, so it is not prime.
                result = false;
                break;
            }
        }
    }
    
    return result;
}



     result = 0;
    
    for (var i=0; i<count; i++) {
        if (isPrime(i)) {
            result++;
          
        }
    }
console.log(result);
res.render("bombpage",{countdown:countdown,currentUser:currentUser,count:count,result:result,currentUser:currentUser});
   var timer = countdown;
    setInterval(function () {

        if (--timer < 0) {
           countdown=0;
        }
countdown=--timer;
    }, 1000);

});
app.get('/logout',(req,res) => {
currentUser="null";
countdown=0;
count=0;
res.redirect("/");
});

function isLoggedIn(req,res,next){
  if(currentUser==="T" ){
    return next();
  }
  res.redirect("/");
}
function isLoggedInAsS(req,res,next){
  if(currentUser==="S"){
    return next();
  }
  res.redirect("/");
}
