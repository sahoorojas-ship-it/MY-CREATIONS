var maze_box = document.getElementById('maze_box')
var tracker = document.getElementById('tracker')
var ball = document.getElementById('ball')
var end = document.getElementById('end')

// moving the maze and ball functions
var tracker_x = 50
var tracker_y = 50
var move_speed = 5
var d= {}

var ball_x = 40;
var ball_y = 40;

ball.style.left = ball_x + 'px'
ball.style.top = ball_y + 'px'

function changeColor() {
  var root = document.documentElement;
  var color = Math.floor(Math.random()*360)  
  root.style.setProperty('--color', "hsl("+color+"deg,100%,60%)");  
}

var level_count = 0
var levels = [ 
  {
    end_x:340,
    end_y:340,
    layout: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    end_x:340,
    end_y:240,
    layout: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
             1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    end_x:20,
    end_y:20,
    layout: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    end_x:260,
    end_y:260,
    layout: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,1,
             1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  {
    end_x:20,
    end_y:20,
    layout: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,
             1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1,
             1,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
             1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,
             1,1,0,0,0,0,0,1,1,0,1,1,0,0,0,1,0,0,0,1,
             1,1,1,0,0,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,
             1,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,
             1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
             1,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,
             1,0,1,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,
             1,1,1,0,0,0,0,1,1,0,1,1,0,0,0,1,0,0,0,1,
             1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,1,
             1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,
             1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,
             1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
]    
// console.log(levels.length)

// adding the walls
var walls = []
function newMaze() {
  changeColor()
  if(document.getElementsByClassName('block')) {
    var blocks = document.querySelectorAll('.block')
    blocks.forEach(function(elm){
      elm.remove()
    })
    ball.innerHTML = level_count + 1
  }

  for(var i=0;i<400;i++) {
    var block = document.createElement('div')
    block.className =  levels[level_count].layout[i] == 1 ? 'block wall ' : 'block'
    if(levels[level_count].layout[i] == 1 ) { walls.push(i) }
    maze_box.appendChild(block)
  }  

  end.style.left = levels[level_count].end_x + 'px'
  end.style.top = levels[level_count].end_y + 'px'
  // console.log(walls)

  function moveMaze(e) {
    window.addEventListener('keydown', function(e) { d[e.which] = true; });
    window.addEventListener('keyup', function(e) { d[e.which] = false; });

    var tracker_loc = tracker.getBoundingClientRect()
    if(d[37] && tracker_x > 1) {
      tracker_x -= move_speed
    }
    if(d[39] && tracker_x < 99) {
      tracker_x += move_speed
    }
    if(d[38] && tracker_y > 1) {
      tracker_y -= move_speed
    }
    if(d[40] && tracker_y < 99) {
      tracker_y += move_speed
    }
    if(d[32]) {
      tracker_x = 50
      tracker_y = 50
    }

    var rx = tracker_x < 50 ? -(1-(tracker_x/50))*15 : (1-(50/tracker_x))*2*15 ;
    var ry = tracker_y < 50 ? -(1-(tracker_y/50))*15 : (1-(50/tracker_y))*2*15 ;
    maze_box.style.transform = 'rotateX('+(-ry)+'deg) rotateY('+rx+'deg)'

    var bx = rx/4
    var by = ry/4  
    var ball_x_one = Math.floor((ball_x +15)/20)
    var ball_x_two = Math.floor((ball_x)/20)
    var ball_y_one = Math.floor((ball_y)/20)*20
    var ball_y_two = Math.floor((ball_y)/20)*20
    var ball_blocks = [...new Set([ball_x_one + ball_y_one - 1,ball_x_two + ball_y_one + 1,ball_x_one + ball_y_two - 20,ball_x_two + ball_y_two + 20])]
    ball_blocks.forEach(function(elm){

    })  

    if(tracker_x < 48 && ball_x + bx > 0 && !walls.includes(ball_blocks[0])) {
      ball_x += bx
      ball.style.left = ball_x + 'px'
    } else if(tracker_x > 52 && ball_x + bx < 385 && !walls.includes(ball_blocks[1])) {
      ball_x += bx
      ball.style.left = ball_x + 'px'
    } 

    if(tracker_y < 48 && ball_y - by > 0 && !walls.includes(ball_blocks[2])) {
      ball_y += by
      ball.style.top = ball_y - 15  + 'px'
    } else if(tracker_y > 52 && ball_y - by < 385 && !walls.includes(ball_blocks[3])) {
      ball_y += by
      ball.style.top = ball_y + 'px'
    }  

    // check for reaching end point
    var ball_loc = ball.getBoundingClientRect()
    var end_loc = end.getBoundingClientRect()

    var win = !(end_loc.right < ball_loc.left || 
                end_loc.left > ball_loc.right || 
                end_loc.bottom < ball_loc.top || 
                end_loc.top > ball_loc.bottom) 
    if(win){
      clearInterval(run_game)      
      if(level_count < levels.length - 1) {
        level_count++
        walls = []
        newMaze()  
      } else {
        level_count = 0
        walls = []
        newMaze()
      } 
    }   
  }
  var run_game = setInterval(moveMaze,1000/60)

  }
setTimeout(function(){ 
  newMaze()
},250)

if (password === "maze") {
    alert("Welcome to the page!");
} else {
    alert("Incorrect Password!");
    document.body.innerHTML =
        "<h1 style='color: red; text-align: center; margin-top: 50px;'>Access Denied</h1>" +
        "<p style='color: red; text-align: center;'>The password you've entered is incorrect. Please try again</p>";
}