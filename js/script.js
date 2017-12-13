// alert('Loaded JS');


$(() => {


  const $audio = $('#audio').get(0);
  const $boxes = $('.soundbox');
  const $gridList = $('ul');
  const $instructions = $('.letsgo');
  const $resetPage = $('.reset');
  let boxChosen = [];
  const $timer = $('.timer');
  let time = 0;
  let timerIsRunning = false;
  let timerId = null;

  // const levelOneArray = [
  //   {
  //     type: 'sound',
  //     id: 'brickbreak'
  //   },{
  //     type: 'sound',
  //     id: 'brickbreak'
  //   },{
  //     type: 'sound',
  //     id: 'pause'
  //   },{
  //     type: 'sound',
  //     id: 'pause'
  //   },{
  //     type: 'sound',
  //     id: 'mariodies'
  //   },{
  //     type: 'sound',
  //     id: 'mariodies'
  //   },{
  //     type: 'sound',
  //     id: 'fireball'
  //   },{
  //     type: 'sound',
  //     id: 'fireball'
  //   },{
  //     type: 'sound',
  //     id: 'jump'
  //   },{
  //     type: 'sound',
  //     id: 'jump'
  //   },{
  //     type: 'sound',
  //     id: 'oneup'
  //   },{
  //     type: 'sound',
  //     id: 'oneup'
  //   },{
  //     type: 'sound',
  //     id: 'pipe'
  //   },{
  //     type: 'sound',
  //     id: 'pipe'
  //   },{
  //     type: 'sound',
  //     id: 'coin'
  //   },{
  //     type: 'sound',
  //     id: 'coin'
  //   },{
  //     type: 'sound',
  //     id: 'yoshi'
  //   },{
  //     type: 'sound',
  //     id: 'yoshi'
  //   },{
  //     type: 'sound',
  //     id: 'mario'
  //   },{
  //     type: 'sound',
  //     id: 'mario'
  //   }];

  // Randomizing list order
  $gridList.each(function(){
    const $ul = $(this);
    const $liArr = $ul.children('li');
    // $liArr.each(($listItem) => {
    //   $listItem.data(levelOneArray);
    // });
    // console.log($liArr);
    $liArr.sort(function(a,b){
      const temp = parseInt( Math.random()*10 );
      const isOddOrEven = temp%2;
      const isPosOrNeg = temp>5 ? 1 : -1;
      return( isOddOrEven*isPosOrNeg );
    });
    $liArr.appendTo($ul);
  });



  // Checking if player has found all pairs, and showing the Result-screen
  function checkResult() {
    const numItems = $('.correct').length;
    if (numItems === 20) {
      $('.finished').removeClass('goaway');
      $('.clearedlevel').text(`You cleared the level in ${time} seconds!`);
    }
  }


  //Checking for match, by checking the two values in the array, then clearing the array
  function checkForMatch() {
    if (boxChosen[0] === boxChosen[1]){
      console.log('Match!');
      $(`[data-id="${boxChosen[0]}"]`).attr('src', 'images/red_check.png');
      $(`[data-id="${boxChosen[0]}"]`).addClass('correct');
      boxChosen = [];
      checkResult();
    } else {
      console.log('Try again');
      $boxes.addClass('setnull');
      setTimeout( function() {
        $(`[data-id="${boxChosen[0]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-id="${boxChosen[1]}"]`).attr('src', 'images/blue_square.png');
        boxChosen = [];
        $boxes.removeClass('setnull');
      } , 1000);
    }
  }


  // Function for playing sounds, and starts of the whole chain of functions for the game
  function playSound(e) {
    const filename = $(e.target).attr('data-id');
    $audio.src = `sounds/${filename}.wav`;
    $audio.play();
    console.log(filename);
    $(e.target).attr('src', 'images/music.png');
    $(e.target).addClass('setnull');
    boxChosen.push(filename);
    startTimer();
    if (boxChosen.length === 2){
      checkForMatch();
    }
  }


  // Function for the timer
  function startTimer() {
    if (timerIsRunning) {
      console.log(time);
    } else {
      timerId =  setInterval(() => {
        time++;
        $timer.text(time);
      }, 1000);
      timerIsRunning = true;
    }
  }


  function removeInstructions() {
    $('.instructions').addClass('goaway');
  }

  // Event listeners
  $instructions.on('click', removeInstructions);
  $boxes.on('click', playSound);
  $resetPage.on('click', function() {
    location.reload();
  });

});
