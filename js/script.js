$('.remind').live('click',function(){
	var msg ="Do you want to email "+$(this).attr("id") + "?";
	console.log(msg);
	new Messi(msg, {buttons: [{id: 0, label: 'Yes', val: 'Y'}, {id: 1, label: 'No', val: 'N'}], modal:true});
});
$('.settle').live('click',function(){
	var msg ="Already settled with "+$(this).attr("id") + "?";
	console.log(msg);
	new Messi(msg, {buttons: [{id: 0, label: 'Yes', val: 'Y'}, {id: 1, label: 'No', val: 'N'}], modal:true});
});