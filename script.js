(function(){
  console.log($('.card').height());
  var smiley = 'smiley.png';
  var counter = 0;
  var checkWinner = [];
  var matched = 0;
  var paused = false;
  var disableButton = false;
  var tries = 0;
  var startButton = $('.button');
  var cromulon = $('.cromulon');
  var $board = $('.board');
  var $modal = $('.modal');
  var showMe = 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/710/original/Show_me_what_you_got!.wav?1469744432';

  function playSound(url){
    var a = new Audio(url);
    a.play();
  }

  var Memory = {

    init: function(cards){
      this.cardsArray = $.merge(cards, cards);
      this.setup();
    },

    setup: function(){
      this.shuffleCards(this.cardsArray);
      this.html = this.buildHTML(this.cardsArray);
      $board.html(this.html);
      this.binding();
      matched = 0;
      checkWinner = [];
      tries = 0;
    },

    start: function(){
      startButton.click(function(){
        if(disableButton === true){
          return;
        }
        $(this).addClass('hidden');
        disableButton = true;
        playSound(showMe);
        cromulon.addClass('activated');
        setTimeout(function(){
          cromulon.removeClass('activated').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
          function(e) {
            $(this).css('display', 'none');
          });
          $board.addClass('started');
        }, 4000);
        Memory.init(cards);
      })
    },

    shuffleCards: function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    binding: function(){
      this.$memoryCards = $(".card-container");
      this.$memoryCards.on("click", this.cardClicked);
    },

    resetCounters: function(){
      checkWinner = [];
      counter = 0;
      return checkWinner, counter;
    },

    showModal: function(){
      $modal.css('display', 'block');
      this.span = $('span');
      this.span.text(tries);
    },

    reset: function(){
      this.tryAgain = $('.try-again');
      this.tryAgain.on('click', function(){
        $modal.css('display', 'none');
        Memory.setup();
      })
    },

    cardClicked: function(evt){
      var card = $(this).find('>:first-child');
      var cardId = card.attr('data-id');
      if(card.hasClass('flipped')){
        return;
      } else if(paused == true){
        return;
      }
      checkWinner.push(cardId);
      card.addClass('flipped');
      counter++;
      if(counter == 2 && checkWinner[0] === checkWinner[1]){
        tries++;
        var firstCard = $(".card[data-id='" + checkWinner[0] + "']");
        card.parent().addClass('match');
        firstCard.parent().addClass('match');
        matched++;
        Memory.resetCounters();
        if(matched == 8){
          var youWon = 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/706/original/I_like_what_you_got.wav?1469744420';
          playSound(youWon);
          Memory.showModal();
        }
      } else if (counter == 2 && checkWinner[0] !== checkWinner[1]) {
        tries++;
        var firstCard = $(".card[data-id='" + checkWinner[0] + "']");
        paused = true;
        setTimeout(function(){
          card.removeClass('flipped');
          firstCard.removeClass('flipped');
          paused = false;
        }, 1000);
        Memory.resetCounters();
      }
      console.log(matched);
      console.log(counter);
      console.log(checkWinner);
    },

    buildHTML: function(){
      var frag = '';
      $.each(cards, function(k, v){
        frag += '<div class="card-container"><div class="card" data-id="' + v.id + '"><div class="front"></div><div class="back"><img src="' + v.img + '" alt="' + v.name + '"></div></div></div>';
      });
      return frag;
    }

  }

  var cards = [
		{
			name: "Rick",
			img: "assets/images/rick.png",
			id: 1,
		},
		{
			name: "Morty Smith",
			img: "assets/images/morty.png",
			id: 2
		},
		{
			name: "Jerry Smith",
			img: "assets/images/jerry.png",
			id: 3
		},
		{
			name: "Birdperson",
			img: "assets/images/birdperson.png",
			id: 4
		},
		{
			name: "Snuffles",
			img: "assets/images/snuffles.png",
			id: 5
		},
		{
			name: "Mr. Goldnefold",
			img: "assets/images/mrgoldenfold.png",
			id: 6
		},
		{
			name: "Mr. Meeseeks",
			img: "assets/images/mrmeeseeks.png",
			id: 7
		},
		{
			name: "Mr. Flippynips",
			img: "assets/images/mrflippynips.png",
			id: 8
		},
	];
  Memory.reset();
  // Memory.init(cards);
  Memory.start();
})()
