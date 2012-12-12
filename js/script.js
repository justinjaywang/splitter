$('.remind').live('click',function(){
	$('body').addClass('modalOpen');
	$('#modal-hide').hide();
	var msg ="Do you want to email "+$(this).attr("id") + "?";
	$('#modal').html('<div class="content-padded-custom content-modal"><p class="settle-paragraph">'+msg+'</p><a class="button-positive button-block modal-button" data-ignore="push">Remind</a>    <a class="modalOpener button button-block modal-button">Cancel</a></div></div><script>$(".modal-button").live("click",function(){	$("body").removeClass("modalOpen");		$("#modal-hide").show();	$("#modal").html("");});</script>');
	console.log(msg);
});
$('.settle').live('click',function(){
	$('body').addClass('modalOpen');
	$('#modal-hide').hide();
	var msg ="Already settled with "+$(this).attr("id") + "?";
	$('#modal').html('<div class="content-padded-custom content-modal"><p class="settle-paragraph">'+msg+'</p><a class="button-positive button-block modal-button" data-ignore="push">Settle up</a>    <a class="modalOpener button button-block modal-button">Cancel</a></div></div><script>$(".modal-button").live("click",function(){	$("body").removeClass("modalOpen");		$("#modal-hide").show();	$("#modal").html("");});</script>');
	console.log(msg);
});
