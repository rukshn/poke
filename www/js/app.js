$('#btnnew').click(function(e){
	e.preventDefault();
    $('.post-field').toggle();
    $('#msg').focus();
})

$('#post').click(function(e){
	var data = $('#msg').val();
	var url = 'https://podi.pw/api/poke';
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	var source   = document.getElementById("feed-template").innerHTML;
	var template = Handlebars.compile(source);
	var newfdata = [{poke: data, poke_time: moment(time, 'MMMM Do YYYY, h:mm:ss a').fromNow()}];
    var html = template(newfdata);
    $('#render-feed').prepend(html);
    $('#msg').val('');

	// $.ajax({
	// 	method: 'POST',
	// 	data: {message: data, dtime: time},
	// 	url: url
	// })
})

// A $( document ).ready() block.
$( document ).ready(function() {
    var n = 1;
	var source   = document.getElementById("feed-template").innerHTML;
	var template = Handlebars.compile(source);
    
    var url = 'https://podi.pw/api/feed';
    var feed_data = {};
    $.ajax({
    	method: 'get',
    	url: url,
    	success: function(data){
    		if(feed_data !== null){
    			feed_data = JSON.parse(data);
    			for (var i = feed_data.length - 1; i >= 0; i--) {
    				feed_data[i]['poke_time'] = moment(feed_data[i]['poke_time'], 'MMMM Do YYYY, h:mm:ss a').fromNow();
    			}
    		}
    		var html = template(feed_data);
    		$('#render-feed').html(html);
    	}
    })

    $('#lmore').click(function(){
        var url = 'https://podi.pw/api/more_pokes'
        $.ajax({
            method: 'get',
            url: url,
            data: {n: n},
            success: function(data){
                if (data) {
                    if (data == []) {return}
                    var newfdata = JSON.parse(data);
                    for (var i = feed_data.length - 1; i >= 0; i--) {
                        feed_data[i]['poke_time'] = moment(feed_data[i]['poke_time'], 'MMMM Do YYYY, h:mm:ss a').fromNow();
                    }
                    var html = template(feed_data);
                    $('#render-feed').append(html);
                    n++;
                }
            }
        })
    })
});