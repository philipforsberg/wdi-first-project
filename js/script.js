// alert('Loaded JS');


$(() => {


  const boxChosen = [];

  const $audio = $('#audio').get(0);
  const $buttons = $('.soundbox');


  function checkForMatch() {
    if (boxChosen[0] === boxChosen[1]){
      alert('Match!');
    }
  }


  function playSound(e) {
    const filename = $(e.target).attr('data-id');
    $audio.src = `sounds/${filename}.wav`;
    $audio.play();
    console.log(filename);
    $(e.target).attr('src', 'images/music.png');
    boxChosen.push(filename);
    if (boxChosen.length === 2) {
      checkForMatch();
    }
  }



  $buttons.on('click', playSound);






  // var flipCard = function(){
  //   var cardId = this.getAttribute('data-id');
  //   this.setAttribute('src', (cards[cardId].cardImage));
  //   if (cardsInPlay.length === 2) {
  //     checkForMatch();
  //   }
  //   cardsInPlay.push(cards[cardId].rank);
  // };





});
