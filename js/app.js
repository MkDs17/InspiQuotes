// On code proprement en JS => module / objet
let app = {
  $quotesList: [],

  // Par convention on crée une méthode init
  init: function() {
    console.log('init');
      
    app.randomBackground();
    app.loadQuote();
    
    setInterval(app.reLoadQuote, 6500);

    $('#likes').on('click', app.addOneLike);
    $('#reload').on('click', app.reLoadQuote);
  },
  
  // Recharge une citation
  reLoadQuote: function() {
    app.generateQuote();
  },

  randomBackground: function() {
    let base = 'img/';
    $("#bg").backstretch([`${base}bg.jpg`, `${base}bg1.jpg`, `${base}bg2.jpg`, `${base}bg3.jpg`, `${base}bg4.jpg`],
    {duration: 5000, fade:1500});
  }, 

  //Fonction permet la séléction d'un chiffre au hasard
  randomNumber: function(min, max) {    
    min = Math.ceil(min);
    max = Math.floor(max);
    $randomNumber = Math.floor(Math.random() * (max - min +1)) + min;  
    return $randomNumber;
  },

  loadQuote: function() {
    $quotesList = app.$quotesList
    
    $.ajax(
      {
        url: 'quotes.json',
        method: 'GET',
        dataType: 'json'
      }
    ).done(
      function(response) 
      {
        res = response;        
        $.each(res, function(i, quote) 
        {
          $quotesList.push(quote)          
        })

        app.generateQuote();

      }
    ).fail(
        function() 
        {
          alert('Ajax loading failed');
        }
    );   

  },  

  generateQuote: function() {

    // Permet de réactiver le button like 
    $('#likes').find('button').removeClass('disabled');

    // Longueur de l'array -1 , vu que l'index commence à zéro et non 1 !
    app.randomNumber(0, ($quotesList.length-1))    

    // .hide().html().fadeIn() => permet de replacer valeur précedente avec effet fadeIn
    $('#quote').attr('data-id', $quotesList[$randomNumber]['id'])
    $('#quote #text').hide().html($quotesList[$randomNumber]['text']).fadeIn(1500)
    $('#quote #number').html($quotesList[$randomNumber]['likes'])
    $('#quote #authorName').html($quotesList[$randomNumber]['author'])
  },
  
  addOneLike: function(evt) {

    // permet de récuperer le nombre de likes du bouton sur lequel on clique
    $numberToChange = $(evt.target).find('#number').text()
    
    // On transforme la string en number pour l'incrémenter d'un point
    $newNumber = parseInt($numberToChange)
    $newNumber++
  
    $(evt.target).find('#number').text($newNumber)
    $('#likes').find('button').addClass('disabled')

  }

};
  
  
$(app.init);



  