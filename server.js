var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
	title: "Article One |Muthukumaran G",
	heading: "Article-One",
	date: "31st Aug 2017",
	comment: `<p> This is my first Article under this Web page </p>
	  <p> This is my first Article under this Web page </p>
	  <p> This is my first Article under this Web page </p>
	   `
};

function createTemplate(data){
	var title = data.title;
	var head = data.heading;
	var date = data.date;
	var comment = data.comment;
	
	var htmlTemplate = `
	<html>
	<head>
	<title>
	${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>
                  ${head}
              </h3>
              <div>
                  ${date}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
              <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(re,res){
 // res.sendFile(path.join(__dirname,'ui', 'article-one.html'));
  res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req,res){
    res.send("Hi This is my Second article.");
});

app.get('/article-three',function(req,res){
    res.send("Hi This is my Third article.");
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
