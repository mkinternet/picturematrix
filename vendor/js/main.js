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
		[3,3],[2,4,2],[1,2,1],[1,1],[2,2],[3,3],[3,3],[6],[4],[2],
	],
	'inputx' : [
		[5],[3,2],[3,1],[3,2],[3,2],[3,2],[3,2],[3,1],[3,2],[5]
		
	]		
};

var picturematrix = [];

examplearr.push(example);


$( document ).ready(function() {
    console.log( "ready!" );
	
	$('#picturesizefrm button').click(drawPictureMatrix);
	
	
	$.each( examplearr, function( key, value ) {
		
		$('#selectexamples').append($('<option>', {value:key, text: value.label+' '+value.sizex+'x'+value.sizey}));				
		
	});
	
	$('#selectexamples').val(3);
	
	
	drawPictureMatrix();
	
	
	$('.cell').click(pointClick);
	
	
});


function drawPictureMatrix()
{
	var exampleindex = $("#selectexamples").val();
	
	//console.log(exampleindex);
	
	var example = examplearr[exampleindex];
	
	var sizex = example.sizex-1;
	var sizey = example.sizey-1;
	

	
	
	var x = 0;
	var y = 0;
	var html = '';
	var maxyelem = parseInt(sizey/2)+1;
	var maxxelem = parseInt(sizex/2)+1;

	// fill empty matrix
	for(x=0;x<=sizex;x++)
	{
		ycol = [];
		
		for(y=0;y<=sizey;y++) {ycol.push(0);}
		
		picturematrix.push(ycol);
	}

//	console.log(maxyelem);


	//rysowanie nad matryca
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
				if(typeof example.inputx[y] !== 'undefined'){
					
					if(typeof example.inputx[y][maxxelem-x] !== 'undefined'){
						value = example.inputx[y][maxxelem-x];
				//		console.log('inputx:'+x+' '+y);
					}
				}
			}
			
		   	html += '<div style="position:relative;" class="cell" x="'+x+'" y="'+y+'" id="cell['+x+'-'+y+']"><input type="text" id="inputx'+(maxxelem-i+1)+'" value="'+value+'"/></div>';
		}

		html += '</div>';
	}


	//rysowanie matrycy
	for(x=0;x<=sizex;x++)
	{
		html += '<div class="row">';
		



		for(i=0;i<=maxyelem;i++){

			value = '';
			
			if(example.hasOwnProperty('inputy')){
				//console.log(example.inputx[x][y]);
				if(typeof example.inputy[x] !== 'undefined'){
					
					if(typeof example.inputy[x][maxyelem-i] !== 'undefined'){
						value = example.inputy[x][maxyelem-i];
						console.log('inputy:'+i+' '+x);
						console.log(example.inputy[i]);
					}
				}
			}
			
			
			html += '<div style="position:relative;" class="cell"><input type="text" id="inputy'+(maxyelem-i+1)+'" value="'+value+'"/></div>';
		}
		
		for(y=0;y<=sizey;y++)
		{
		   	html += '<div style="position:relative;" class="cell cell-blank" x="'+x+'" y="'+y+'" id="cell['+x+'-'+y+']"></div>';
		}

		html += '</div>';
	}

	
	$('.point').click(pointClick);

	//console.log('Wybudowane '+sizex+' '+sizey);	
	console.log(picturematrix);
	
	$("#picturematrix").html(html);
	
	$("#clearmatrixbtn").click(clearMatrix);
	
}


function pointClick()
{

	
	var x = $(this).attr('x');
	var y = $(this).attr('y');
		
	if($(this).hasClass('cell-blank')){
		
		$(this).removeClass('cell-blank');
		$(this).addClass('cell-fill');
		
		picturematrix[x][y] = 2; 
		
	}else if($(this).hasClass('cell-fill')){
		
		$(this).removeClass('cell-fill');
		$(this).addClass('cell-empty');
		
		picturematrix[x][y] = 1;
		
	}else if($(this).hasClass('cell-empty')){
		
		$(this).removeClass('cell-empty');
		$(this).addClass('cell-blank');
		
		picturematrix[x][y] = 0;
		
	}
	
	//console.log($(this).attr('x')+'  '+$(this).attr('y'));
}


function clearMatrix(){
	
	//console.log(picturematrix[0].length);
	
	for(x=0;x<picturematrix.length;x++)
	{
		for(y=0;y<picturematrix[0].length;y++){
			
				picturematrix[x][y] = 0;
			
				obj = $("#cell["+x+"-"+y+"]");
				obj.removeClass('cell-fill');
				obj.removeClass('cell-empty');
				obj.addClass('cell-blank');
		}
	}
	
	
}

