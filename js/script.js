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
      id: 'batman.'
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

  console.log(levelTwoObject);

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
  // function clickMade(e) {
  //   const filename = $(e.target).attr(`data-${levelOneObject[0].type}`);
  //   $audio.src = `sounds/${filename}.wav`;
  //   $audio.play();
  //   console.log(filename);
  //   // const imageSource = $(e.target).attr('data-picture');
  //   // $(e.target).attr('src', imageSource);
  //   $(e.target).attr('src', 'images/music.png');
  //   $(e.target).addClass('setnull');
  //   boxChosen.push(filename);
  //   startTimer();
  //   if (boxChosen.length === 2){
  //     checkForMatch();
  //   }
  // }

  // function clickMade(e) {
  //   const filename = $(e.target).attr(`data-${levelOneObject[0].type}`);
  //   console.log(filename);
  //   if ((levelOneObject[0].type) === 'sound') {
  //     $audio.src = `sounds/${filename}.wav`;
  //     $audio.play();
  //     $(e.target).attr('src', 'images/music.png');
  //   } else if  ((levelOneObject[0].type) === 'picture'){
  //     $(e.target).attr('src', `.images/${levelOneObject[0].id}.png`);
  //   }
  //   $(e.target).addClass('setnull');
  //   boxChosen.push(filename);
  //   startTimer();
  //   if (boxChosen.length === 2){
  //     checkForMatch();
  //   }
  // }

  function clickMade(e) {
    const filename = $(e.target).attr(`data-${levelTwoObject[0].type}`);
    console.log(filename);
    console.log(levelTwoObject[0].type);
    if ((levelTwoObject[0].type) === 'sound') {
      $audio.src = `sounds/${filename}.wav`;
      $audio.play();
      $(e.target).attr('src', 'images/music.png');
    } else if  (($(e.target).levelTwoObject[0].type) === 'picture'){
      $(e.target).attr('src', `.images/${levelTwoObject[0].id}.png`);
    }
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
  $boxes.on('click', clickMade);
  $resetPage.on('click', function() {
    location.reload();
  });

});
