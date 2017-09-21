console.log('Loaded!');


var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
	marginLeft = marginLeft + 1;
	img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
	var interval = setInterval(moveRight,40);
    
};

var button = document.getElementById('comment');
var counter = 0;
button.onclick = function() {
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) {
			f (request.status === 200){
				var comment = request.responseText;
				var span = document.getElementById('count');
	            span.innerHTML = comment.toString();
			}
		}
	};
	
	request.open('GET','http://gmkumaran87.imad.hasura-app.io/counter',true);
	request.send(null);
};