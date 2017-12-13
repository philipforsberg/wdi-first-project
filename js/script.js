// alert('Loaded JS');


$(() => {


  const $audio = $('#audio').get(0);
  const $boxes = $('.soundbox');
  const $gridList = $('ul');
  const $levelOne = $('.levelone');
  const $levelTwo = $('.leveltwo');
  const $resetPage = $('.reset');
  let boxChosen = [];
  const $timer = $('.timer');
  let time = 0;
  let timerIsRunning = false;
  let timerId = null;
  //

  const levelOneObject = [
    {
      type: 'data-sound',
      id: 'brickbreak'
    },{
      type: 'data-sound',
      id: 'brickbreak'
    },{
      type: 'data-sound',
      id: 'pause'
    },{
      type: 'data-sound',
      id: 'pause'
    },{
      type: 'data-sound',
      id: 'mariodies'
    },{
      type: 'data-sound',
      id: 'mariodies'
    },{
      type: 'data-sound',
      id: 'fireball'
    },{
      type: 'data-sound',
      id: 'fireball'
    },{
      type: 'data-sound',
      id: 'jump'
    },{
      type: 'data-sound',
      id: 'jump'
    },{
      type: 'data-sound',
      id: 'oneup'
    },{
      type: 'data-sound',
      id: 'oneup'
    },{
      type: 'data-sound',
      id: 'pipe'
    },{
      type: 'data-sound',
      id: 'pipe'
    },{
      type: 'data-sound',
      id: 'coin'
    },{
      type: 'data-sound',
      id: 'coin'
    },{
      type: 'data-sound',
      id: 'yoshi'
    },{
      type: 'data-sound',
      id: 'yoshi'
    },{
      type: 'data-sound',
      id: 'mario'
    },{
      type: 'data-sound',
      id: 'mario'
    }];



  const levelTwoObject = [
    {
      type: 'data-sound',
      id: 'shrek'
    },{
      type: 'data-sound',
      id: 'shrek'
    },{
      type: 'data-sound',
      id: 'batman'
    },{
      type: 'data-sound',
      id: 'batman'
    },{
      type: 'data-sound',
      id: 'pulpfiction'
    },{
      type: 'data-sound',
      id: 'pulpfiction'
    },{
      type: 'data-sound',
      id: 'austinpowers'
    },{
      type: 'data-sound',
      id: 'austinpowers'
    },{
      type: 'data-sound',
      id: 'godfather'
    },{
      type: 'data-sound',
      id: 'godfather'
    },{
      type: 'data-sound',
      id: 'terminator'
    },{
      type: 'data-sound',
      id: 'terminator'
    },{
      type: 'data-sound',
      id: 'starwars'
    },{
      type: 'data-sound',
      id: 'starwars'
    },{
      type: 'data-sound',
      id: 'goodmorning'
    },{
      type: 'data-sound',
      id: 'goodmorning'
    },{
      type: 'data-sound',
      id: 'themask'
    },{
      type: 'data-sound',
      id: 'themask'
    },{
      type: 'data-sound',
      id: 'jerrymaguire'
    },{
      type: 'data-sound',
      id: 'jerrymaguire'
    }];


  // Randomizing list order level one
  function levelOneChosen() {
    $gridList.each(function(){
      const $ul = $(this);
      const $liArr = $ul.children('li');
      $liArr.each((i, li) => {
        const $img = $(li).children('img');
        $img.attr(levelOneObject[i].type, levelOneObject[i].id);
      });
      $liArr.sort(function(a,b){
        const temp = parseInt( Math.random()*10 );
        const isOddOrEven = temp%2;
        const isPosOrNeg = temp>5 ? 1 : -1;
        return( isOddOrEven*isPosOrNeg );
      });
      $liArr.appendTo($ul);
    });
  }


  // Randomizing list order level two
  function levelTwoChosen() {
    $gridList.each(function(){
      const $ul = $(this);
      const $liArr = $ul.children('li');
      $liArr.each((i, li) => {
        const $img = $(li).children('img');
        $img.attr(levelTwoObject[i].type, levelTwoObject[i].id);
      });
      $liArr.sort(function(a,b){
        const temp = parseInt( Math.random()*10 );
        const isOddOrEven = temp%2;
        const isPosOrNeg = temp>5 ? 1 : -1;
        return( isOddOrEven*isPosOrNeg );
      });
      $liArr.appendTo($ul);
    });
  }


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
      $(`[data-sound="${boxChosen[0]}"]`).attr('src', 'images/red_check.png');
      $(`[data-sound="${boxChosen[0]}"]`).addClass('correct');
      boxChosen = [];
      checkResult();
    } else {
      console.log('Try again');
      $boxes.addClass('setnull');
      setTimeout( function() {
        $(`[data-sound="${boxChosen[0]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-sound="${boxChosen[1]}"]`).attr('src', 'images/blue_square.png');
        boxChosen = [];
        $boxes.removeClass('setnull');
      } , 1000);
    }
  }


  // Function for playing sounds, and starts of the whole chain of functions for the game
  function playSound(e) {
    const filename = $(e.target).attr('data-sound');
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


  function setupLevelOne() {
    $('.instructions').addClass('goaway');
    levelOneChosen();
  }

  function setupLevelTwo() {
    $('.instructions').addClass('goaway');
    levelTwoChosen();
  }


  // Event listeners
  $levelOne.on('click', setupLevelOne);
  $levelTwo.on('click', setupLevelTwo);
  $boxes.on('click', playSound);
  $resetPage.on('click', function() {
    location.reload();
  });

});
