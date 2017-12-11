// alert('Loaded JS');


$(() => {



  const $audio = $('#audio').get(0);
  const $boxes = $('.soundbox');
  let boxChosen = [];


  // for(let i = 0; i < $boxes.length; i++){
  //   const target = Math.floor(Math.random() * $boxes.length -1) + 1;
  //   const target2 = Math.floor(Math.random() * $boxes.length -1) +1;
  //   $boxes.eq(target).before($boxes.eq(target2));
  // }
  //
  // const dataIdArray = ['brickbreak', 'brickbreak', 'pause', 'pause', 'mariodies', 'mariodies', 'fireball', 'fireball', 'jump', 'jump','oneup', 'oneup', 'pipe', 'pipe', 'coin', 'coin', 'yoshi', 'yoshi', 'mario', 'mario'];
  //
  // function randomId() {
  //   for (let i=0; i < $boxes.length; i++) {
  //     const randomNumber = Math.floor(Math.random()) * $boxes.length;
  //
  //   }
  // }


  // randomId();

  $('ul').each(function(){
    // get current ul
    var $ul = $(this);
    // get array of list items in current ul
    var $liArr = $ul.children('li');
    // sort array of list items in current ul randomly
    $liArr.sort(function(a,b){
      // Get a random number between 0 and 10
      var temp = parseInt( Math.random()*10 );
      // Get 1 or 0, whether temp is odd or even
      var isOddOrEven = temp%2;
      // Get +1 or -1, whether temp greater or smaller than 5
      var isPosOrNeg = temp>5 ? 1 : -1;
      // Return -1, 0, or +1
      return( isOddOrEven*isPosOrNeg );
    })
    // append list items to ul
      .appendTo($ul);
  });






  function checkResult() {
    const numItems = $('.correct').length;
    console.log(numItems);
    if (numItems === 20) {
      alert('Winner!');
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
      setTimeout( function() {
        $(`[data-id="${boxChosen[0]}"]`).attr('src', 'images/blue_square.png');
        $(`[data-id="${boxChosen[1]}"]`).attr('src', 'images/blue_square.png');
        boxChosen = [];
      } , 1250);
    }
  }

  function playSound(e) {
    const filename = $(e.target).attr('data-id');
    $audio.src = `sounds/${filename}.wav`;
    $audio.play();
    console.log(filename);
    $(e.target).attr('src', 'images/music.png');
    boxChosen.push(filename);
    if (boxChosen.length === 2){
      checkForMatch();
    }
  }


  $boxes.on('click', playSound);

  //on click, check for match, if 2 cards are face up, then check if it"s a pair
  // if its a pair, play sound




});
