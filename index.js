$(document).keypress(function(event) {
    if(event.key == " ")
        start();
    if(event.key == 'w' || event.key == 'W' || event.key == '\'')
        game("green");
    if(event.key == 'e' || event.key == 'E' || event.key == 'ק')
        game("red");
    if(event.key == 's' || event.key == 'S' || event.key == 'ד')
        game("yellow");
    if(event.key == 'd' || event.key == 'D' || event.key == 'ג')
        game("blue");
});

$('#level-title').click(function() {
    start();
});

$(".btn").click(function(){
    game(this.id);
});

var ans = [];
var i = 0;

const colorMap = {
    green: 0,
    red: 1,
    blue: 2,
    yellow: 3
};
  
const valueMap = {
    0: 'green',
    1: 'red',
    2: 'blue',
    3: 'yellow'
};

function start(){
    ans = [];
    i = 0;
    ans.push(Math.floor(Math.random()*4));
    $("#level-title").text("Level 1");
    botPress(i);
}

function botPress(j){
    $("#"+valueMap[ans[j]]).animate({opacity: 0});
    audio = new Audio("sounds/" + valueMap[ans[j]] + ".mp3");
    audio.play();
    $("#"+valueMap[ans[j]]).animate({opacity: 1});
}

function humanPress(i){
    $("#"+valueMap[ans[i]]).addClass("pressed");
    var audio = new Audio("sounds/" + valueMap[ans[i]] + ".mp3");
    setTimeout(function(){
        $("#"+valueMap[ans[i]]).removeClass("pressed");
    }, 100);
    audio.play();
}

function playSequence(j) {
    if (j < ans.length) {
      setTimeout(() => {
        botPress(j);
        playSequence(j + 1); 
      }, 750); 
    }
  }

function game(color){
    if(colorMap[color] == ans[i]){
        humanPress(i);
        if(++i == ans.length){
            ans.push(Math.floor(Math.random()*4));
            var j = 0;
            playSequence(0);
            $("#level-title").text("Level " + (ans.length));
            i = 0;
        }
    } else {
        $("#level-title").text("Game Over! try again.");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            start();
        },1000);
    }
}
