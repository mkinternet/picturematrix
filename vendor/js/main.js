var examplearr = [];

var example = {'label' : "Puste",'sizex' : "10",	'sizey' : "10",};
examplearr.push(example);

var example = {'label' : "Puste",'sizex' : "20",'sizey' : "20",};
examplearr.push(example);

var example = {'label' : "Puste",'sizex' : "30",'sizey' : "30",};

examplearr.push(example);

var example = {
	'label' : "Serce", 'sizex' : "10", 'sizey' : "10",
	'inputy' : [
		[[5],[3,2],[3,1],[3,2],[3,2],[3,2],[3,2],[3,1],[3,2],[5]]
	],
	'inputx' : [
		[[3,3],[2,4,2],[1,2,1],[1,1],[2,2],[3,3],[3,3],[6],[4],[2]],
	]		
};

examplearr.push(example);


$( document ).ready(function() {
    console.log( "ready!" );
	
	$('#picturesizefrm button').click(drawPictureMatrix);
	
	
	$.each( examplearr, function( key, value ) {
		console.log( value.label + ": " + key );
		
		$('#selectexamples').append($('<option>', {value:key, text: value.label+' '+value.sizex+'x'+value.sizey}));				
		
	});
	
	$('#selectexamples').val(3);
	
	
	drawPictureMatrix();
	
	
	$('.cell').click(pointClick);
	
	
});


function drawPictureMatrix()
{
	var exampleindex = $("#selectexamples").val();
	
	console.log(exampleindex);
	
	var example = examplearr[exampleindex];
	
	var sizex = example.sizex;
	var sizey = example.sizey;
	var x = 0;
	var y = 0;
	var html = '';
	var maxyelem = parseInt(sizey/2)+1;
	var maxxelem = parseInt(sizex/2)+1;

	console.log(maxyelem);


	for(x=0;x<=maxxelem;x++)
	{
		html += '<div class="row">';

		for(i=0;i<=maxxelem;i++){
			html += '<div style="" class="cell cell-b0"></div>';
		}
		
		if(example.hasOwnProperty('inputx')){
			//console.log(example.inputx[x]);
		}
		
		for(y=0;y<=sizey;y++)
		{
			value = '';

			if(example.hasOwnProperty('inputx')){
				//console.log(example.inputx[x][y]);
				//value = example.inputx[x][y];
			}
			
		   	html += '<div style="position:relative;" class="cell" id="cell['+x+'-'+y+']"><input type="text" id="inputx'+(maxxelem-i+1)+'" value="'+value+'"/></div>';
		}

		html += '</div>';
	}


	for(x=0;x<=sizex;x++)
	{
		html += '<div class="row">';

		for(i=0;i<=maxxelem;i++){
			html += '<div style="position:relative;" class="cell"><input type="text" id="inputx'+(maxxelem-i+1)+'" /></div>';
		}
		
		for(y=0;y<=sizey;y++)
		{
		   	html += '<div style="position:relative;" class="cell cell-blank" id="cell['+x+'-'+y+']"></div>';
		}

		html += '</div>';
	}

	
	$('.point').click(pointClick);

	console.log('Wybudowane '+sizex+' '+sizey);	
	
	$("#picturematrix").html(html);
	
}


function pointClick()
{
		
	if($(this).hasClass('cell-blank')){
		
		$(this).removeClass('cell-blank');
		$(this).addClass('cell-fill');
		
	}else if($(this).hasClass('cell-fill')){
		
		$(this).removeClass('cell-fill');
		$(this).addClass('cell-empty');
		
	}else if($(this).hasClass('cell-empty')){
		
		$(this).removeClass('cell-empty');
		$(this).addClass('cell-blank');
		
	}
	
	console.log(this.id);
}

