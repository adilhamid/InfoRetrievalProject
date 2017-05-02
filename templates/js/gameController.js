$(document).ready(function () {
	$('#header').load('header.html');
	var questionNumber=0;
	var questionBank=new Array();
	var stage="#game1";
	var stage2=new Object;
	var questionLock=false;
	var numberOfQuestions;
	var score=0;
	var difficulty="easy";
	var diffSelected = false;
selectDifficulty();

function fetchQuestion(){
$.get( "https://opentdb.com/api.php?amount=5&difficulty="+difficulty, function( data ) {
                    var questions = data["results"];
                    for(i=0;i<questions.length;i++){
                    	questionBank[i] = new Array;
                    	questionBank[i][0] = questions[i]["question"];
                    	questionBank[i][1]= questions[i]["correct_answer"];
                    	for(j=0; j<questions[i]["incorrect_answers"].length;j++){
                    	questionBank[i][j+2]= questions[i]["incorrect_answers"][j];
                    	// questionBank[i][3]= questions[i]["incorrect_answers"][1];
                    	// questionBank[i][4]= questions[i]["incorrect_answers"][2];
                    }

                    }
                    numberOfQuestions=questionBank.length;
                    displayQuestion();
                    })
}

 	// 	$.getJSON('activity.json', function(data) {

		// for(i=0;i<data.quizlist.length;i++){ 
		// 	questionBank[i]=new Array;
		// 	questionBank[i][0]=data.quizlist[i].question;
		// 	questionBank[i][1]=data.quizlist[i].option1;
		// 	questionBank[i][2]=data.quizlist[i].option2;
		// 	questionBank[i][3]=data.quizlist[i].option3;
		// }
		//  numberOfQuestions=questionBank.length; 

		// displayQuestion();
		// })//gtjson
 

function selectDifficulty(){
	// if(displayDifficulty==true){
		$(stage).append('<div class="questionText">'+"Select Difficulty Level"+'</div><div id="1" class="option">'+"Easy"+'</div><div id="2" class="option">'+"Medium"+'</div><div id="3" class="option">'+"Hard"+'</div>');
	// }
	$('.option').click(function(){
		difficulty = this.innerText;
		// alert(difficulty);

		difficulty= difficulty.toLowerCase();
		changeSlide();
		// setTimeout(function(){changeSlide()},1000);
		fetchQuestion();
	})
}

function displayQuestion(){
var numberOfoptions = questionBank[questionNumber].length-1;
 // var rnd=Math.random()*4;
 var rnd=Math.random()*numberOfoptions;
rnd=Math.ceil(rnd);
 // var q1;
 // var q2;
 // var q3;
 // var q4;
 var optionHtml = '';
 var j = 2;
 
 for(i = 1; i<=numberOfoptions; i++){
 	if(i==rnd){
 		optionHtml = optionHtml+'<div id="'+i+'" class="option">'+questionBank[questionNumber][1]+'</div>';	
 	}else{
 		optionHtml = optionHtml+'<div id="'+j+'" class="option">'+questionBank[questionNumber][j]+'</div>';	
 		j++;
 	}
 	
 }
$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div>'+optionHtml);
// if(rnd==1){q1=questionBank[questionNumber][1];q2=questionBank[questionNumber][2];q3=questionBank[questionNumber][3];q4=questionBank[questionNumber][4];}
// if(rnd==2){q2=questionBank[questionNumber][1];q3=questionBank[questionNumber][2];q4=questionBank[questionNumber][3];q1=questionBank[questionNumber][4];}
// if(rnd==3){q3=questionBank[questionNumber][1];q4=questionBank[questionNumber][2];q1=questionBank[questionNumber][3];q2=questionBank[questionNumber][4];}
// if(rnd==4){q4=questionBank[questionNumber][1];q1=questionBank[questionNumber][2];q2=questionBank[questionNumber][3];q3=questionBank[questionNumber][4];}

// $(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');

 $('.option').click(function(){
  if(questionLock==false){questionLock=true;	
  //correct answer
  if(this.id==rnd){
   $(stage).append('<div class="feedback1">CORRECT</div>');
   score++;
   }
  //wrong answer	
  if(this.id!=rnd){
  	// alert(rnd);
   $(stage).append('<div class="feedback2">WRONG</div>');
  }
  
  setTimeout(function(){changeQuestion()},1000);
 }})
}//display question

	
	
	
	
	
	function changeQuestion(){
		questionNumber++;
	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}
	
	if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}
	
	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question

	function changeSlide(){
		// displayQuestion();
		if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}
		$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}
	

	
	
	function displayFinalSlide(){
		
		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'</div>');
		$(stage).append('<form action="game.html"><input type="submit"value="Restart" style="float: right; width:25%; height:inherit;" class="btn btn-primary" id = "search" /></form>')
	}//display final slide
	
	
	
	
	
	
	
});//doc ready