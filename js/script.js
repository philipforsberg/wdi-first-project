// alert('Loaded JS');


$(() => {



  const $audio = $('#audio').get(0);
  const $boxes = $('.soundbox');
  const $gridList = $('ul');
  const $gameStarter = $('.letsgo');
  const $resetPage = $('.reset');
  let boxChosen = [];
  const $timer = $('.timer');
  let time = 0;
  let timerIsRunning = false;
  let timerId = null;


  $gridList.each(function(){
    const $ul = $(this);
    const $liArr = $ul.children('li');
    $liArr.sort(function(a,b){
      // Get a random number between 0 and 10
      const temp = parseInt( Math.random()*10 );
      // Get 1 or 0, whether temp is odd or even
      const isOddOrEven = temp%2;
      // Get +1 or -1, whether temp greater or smaller than 5
      const isPosOrNeg = temp>5 ? 1 : -1;
      // Return -1, 0, or +1
      return( isOddOrEven*isPosOrNeg );
    });
    $liArr.appendTo($ul);
  });



  function checkResult() {
    const numItems = $('.correct').length;
    if (numItems === 20) {
      $('.finished').removeClass('goaway');
      $('.clearedlevel').text(`You cleared the level in ${time} seconds!`);
    }
  }

  //
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


  $gameStarter.on('click', function() {
    $('.instructions').addClass('goaway');
  });

  $boxes.on('click', playSound);

  $resetPage.on('click', function() {
    location.reload();
  });





});
