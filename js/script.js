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
      type: 'sound',
      id: 'brickbreak'
    },{
      type: 'sound',
      id: 'brickbreak'
    },{
      type: 'sound',
      id: 'pause'
    },{
      type: 'sound',
      id: 'pause'
    },{
      type: 'sound',
      id: 'mariodies'
    },{
      type: 'sound',
      id: 'mariodies'
    },{
      type: 'sound',
      id: 'fireball'
    },{
      type: 'sound',
      id: 'fireball'
    },{
      type: 'sound',
      id: 'jump'
    },{
      type: 'sound',
      id: 'jump'
    },{
      type: 'sound',
      id: 'oneup'
    },{
      type: 'sound',
      id: 'oneup'
    },{
      type: 'sound',
      id: 'pipe'
    },{
      type: 'sound',
      id: 'pipe'
    },{
      type: 'sound',
      id: 'coin'
    },{
      type: 'sound',
      id: 'coin'
    },{
      type: 'sound',
      id: 'yoshi'
    },{
      type: 'sound',
      id: 'yoshi'
    },{
      type: 'sound',
      id: 'mario'
    },{
      type: 'sound',
      id: 'mario'
    }];


  const levelTwoObject = [
    {
      type: 'sound',
      id: 'shrek'
    },{
      type: 'picture',
      id: 'shrek'
    },{
      type: 'sound',
      id: 'batman'
    },{
      type: 'picture',
      id: 'batman'
    },{
      type: 'sound',
      id: 'pulpfiction'
    },{
      type: 'picture',
      id: 'pulpfiction'
    },{
      type: 'sound',
      id: 'austinpowers'
    },{
      type: 'picture',
      id: 'austinpowers'
    },{
      type: 'sound',
      id: 'godfather'
    },{
      type: 'picture',
      id: 'godfather'
    },{
      type: 'sound',
      id: 'terminator'
    },{
      type: 'picture',
      id: 'terminator'
    },{
      type: 'sound',
      id: 'starwars'
    },{
      type: 'picture',
      id: 'starwars'
    },{
      type: 'sound',
      id: 'goodmorning'
    },{
      type: 'picture',
      id: 'goodmorning'
    },{
      type: 'sound',
      id: 'themask'
    },{
      type: 'picture',
      id: 'themask'
    },{
      type: 'sound',
      id: 'jerrymaguire'
    },{
      type: 'picture',
      id: 'jerrymaguire'
    }];

  // Randomizing list order level one
  function levelOneChosen() {
    $gridList.each(function(){
      const $ul = $(this);
      const $liArr = $ul.children('li');
      $liArr.each((i, li) => {
        const $img = $(li).children('img');
        $img.attr(`data-${levelOneObject[i].type}`, levelOneObject[i].id);
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
        $img.attr(`data-${levelTwoObject[i].type}`, levelTwoObject[i].id);
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
      $('.winner').removeClass('goaway');
      $('.clearedlevel').text(`You cleared the level in ${time} seconds!`);
    }
  }


  //Checking for match, by checking the two values in the array, then clearing the array
  function checkForMatch() {
    if (boxChosen[0] === boxChosen[1]){
      console.log('Match!');
      $(`[data-sound="${boxChosen[0]}"]`).attr('src', 'images/red_check.png');
      $(`[data-picture="${boxChosen[1]}"]`).attr('src', 'images/red_check.png');
      $(`[data-sound="${boxChosen[0]}"]`).addClass('correct');
      $(`[data-picture="${boxChosen[1]}"]`).addClass('correct');
      boxChosen = [];
      checkResult();
    } else {
      console.log('Try again');
      $boxes.addClass('setnull');
      setTimeout( function() {
        $(`[data-sound="${boxChosen[0]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-picture="${boxChosen[0]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-sound="${boxChosen[1]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-picture="${boxChosen[1]}"]`).attr('src', 'images/blue_square.png');
        boxChosen = [];
        $boxes.removeClass('setnull');
      } , 1000);
    }
  }

  function clickMade(e) {
    const soundFilename = $(e.target).attr('data-sound');
    const pictureFilename = $(e.target).attr('data-picture');
    if ($(e.target).attr('data-sound')) {
      $audio.src = `sounds/${soundFilename}.wav`;
      $audio.play();
      $(e.target).attr('src', 'images/music.png');
      boxChosen.push(soundFilename);
    } else if  ($(e.target).attr('data-picture')){
      $(e.target).attr('src', `images/${pictureFilename}.png`);
      boxChosen.push(pictureFilename);
    }
    $(e.target).addClass('setnull');
    if (boxChosen.length === 2){
      checkForMatch();
    }
  }


  // Function for the timer
  function startTimerOne() {
    time = 1;
    if (timerIsRunning) {
      console.log(time);
    } else {
      timerId =  setInterval(() => {
        time--;
        $timer.text(time);
        if(time === 0) {
          clearInterval(timerId);
          $audio.src = 'sounds/mariodies.wav';
          $audio.play();
          $('.loser').removeClass('goaway');
          $('.clearedlevel').text('The good news is, you can try as many times as you want!');
          $boxes.addClass('setnull');
        }
      }, 1000);
      timerIsRunning = true;
    }
  }
  function startTimerTwo() {
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
    startTimerOne();
  }

  function setupLevelTwo() {
    $('.instructions').addClass('goaway');
    levelTwoChosen();
    startTimerTwo();
  }


  // Event listeners
  $levelOne.on('click', setupLevelOne);
  $levelTwo.on('click', setupLevelTwo);
  $boxes.on('click', clickMade);
  $resetPage.on('click', function() {
    location.reload();
  });

  // Cursor porperties
  // $levelOne.css('cursor', 'pointer');
  // $levelTwo.css('cursor', 'pointer');

});
