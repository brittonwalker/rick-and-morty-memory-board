(function(){
  var smiley = 'smiley.png';
  var counter = 0;
  var checkWinner = [];
  var matched = 0;
  var paused = false;
  var disableButton = false;
  function playSound(url){
    var a = new Audio(url);
    a.play();
  }
  var Memory = {

    init: function(cards){
      this.cardsArray = $.merge(cards, cards);
      this.shuffeCards(this.cardsArray);
      this.buildHTML(this.cardsArray);
      this.setup();
      this.binding();
    },

    start: function(){
      this.button = $('.button');
      this.button.click(function(){
        if(disableButton === true){
          return;
        }
        $('.button').addClass('hidden');
        disableButton = true;
        var board = $('.board');
        var cromulon = $('.cromulon');
        var showMe = 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/710/original/Show_me_what_you_got!.wav?1469744432';

        playSound(showMe);
        cromulon.addClass('activated');
        setTimeout(function(){
          cromulon.removeClass('activated').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
          function(e) {
            $(this).css('display', 'none');
            // code to execute after transition ends

          });
          board.addClass('started');
        }, 4000);

        Memory.init(cards);
      })
    },

    shuffeCards: function (array) {
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

    setup: function(){
      // this.shuffeCards(cardsArray);
      this.$board = $('.board');
      this.html = this.buildHTML();
      this.$board.html(this.html);
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
        matched++;
        Memory.resetCounters();
        if(matched == 8){
          $('.cromulon').addClass('activated');
          setTimeout(function(){
            var youWon = 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/706/original/I_like_what_you_got.wav?1469744420';
            playSound(youWon);
            $('.cromulon').removeClass('activated');
          }, 2000);

        }
      } else if (counter == 2 && checkWinner[0] !== checkWinner[1]) {
        var firstCard = $(".card[data-id='" + checkWinner[0] + "']");
        paused = true;
        setTimeout(function(){
          card.removeClass('flipped');
          firstCard.removeClass('flipped');
          paused = false;
        }, 1000);
        Memory.resetCounters();
      }
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
		// {
		// 	name: "rails",
		// 	img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
		// 	id: 9
		// },
		// {
		// 	name: "sass",
		// 	img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
		// 	id: 10
		// },
		// {
		// 	name: "sublime",
		// 	img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
		// 	id: 11
		// },
		// {
		// 	name: "wordpress",
		// 	img: "cromulon.png",
		// 	id: 12
		// },
	];

  // Memory.init(cards);
  Memory.start();
})()
