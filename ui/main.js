console.log('Loaded!');


var marginLeft = 0;
/*function moveRight(){
	marginLeft = marginLeft + 10;
	img.style.marginLeft = marginLeft + 'px';*/
var img = document.getElementById('madi');
img.onclick = function(){
	img.style.marginLeft = '100px';
	//var  interval = setInterval(moveRight,50)
};
