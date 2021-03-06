var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'gmkumaran87',
    database: 'gmkumaran87',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
 articleOne: {
	title: "Article One |Muthukumaran G",
	heading: "Article-One",
	date: "31st Aug 2017",
	comment: `<p> This is my first Article under this Web page </p>
	  <p> This is my first Article under this Web page </p>
	  <p> This is my first Article under this Web page </p>
	   `
},
articleTwo: {
	title: "Article-Two | Kumaran",
	head: "ArticleTwo",
	date: "1st Sep 2017",
	comment: `<p> This is my Second Article </p>
	         <p> This is my Second Article </p>
			 <p> This is my Second Article </p>`
}
};

function createTemplate(data){
	var title = data.title;
	var head = data.heading;
	var date = data.date;
	var content = data.content;
	
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
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
              <h4>Comments</h4>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
	return htmlTemplate;
}

var pool = new Pool(config);
app.get('/test-db',function(req,res) {
	pool.query('SELECT * FROM test',function(err,result) {
		if(err) {
			res.status(500).send(err.toString());
		}else{
			res.send(JSON.stringify(result.rows));
		}
	});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req, res) {
	counter = counter+1;
	res.send(counter.toString());
});
app.get('/articles/:articleName',function(req,res){

 //var articleName = ;
 pool.query("SELECT * FROM ARTICLE WHERE TITLE = $1", [req.params.articleName], function(err,result){
	 if(err) {
			res.status(500).send(err.toString());
		}else{
			if (result.rows.lenght === 0) {
				res.status(404).send('Article not found');
			}else {
				var articleData = result.rows[0];
			    res.send(createTemplate(articleData));
		    }
		}
 });
  
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
