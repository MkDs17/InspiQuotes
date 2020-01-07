// On code proprement en JS => module / objet
let app = {
  // Par convention on crée une méthode init
  init: function() {
    console.log('init');
      
    app.randomBackground();
    app.loadQuote();
    //app.loadPhoto(); 

    $('button').on('click', app.addOneLike);
  },

  randomBackground: function() {
    let base = 'img/';
    $("#bg").backstretch([`${base}bg.jpg`, `${base}bg1.jpg`, `${base}bg2.jpg`, `${base}bg3.jpg`, `${base}bg4.jpg`],
    {duration: 5000, fade:1500});
  }, 
  randomNumber: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    number = Math.floor(Math.random() * (max - min +1)) + min;  
    return number  
  },


  loadPhoto: function() {

      photosList = []

      $.ajax(
          {
              url: 'https://api.unsplash.com/photos',
              method: 'GET',
              dataType: 'json',
              headers: { 'Authorization' : ''}
          }
      ).done(
          function(response) 
          {
              res = response;
              console.log(res);
              $.each(res, function(i, photos) 
              {
                photosList.push(photos.links.html)
              })

              console.log(photosList);

          }
      ).fail(
          function() 
          {
              alert('Ajax loading failed');
          }
      );

  }, 
  loadQuote: function() {
    $quotesList = []
    $quoteNumb = []

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
        //console.log(res);
        $.each(res, function(i, quote) 
        {
          $quotesList.push(quote)
          //$quoteNumb.push(i)
        })

        app.randomNumber(0, 1)
        console.log(number)
        app.generateQuote(number);
      }
    ).fail(
        function() 
        {
            alert('Ajax loading failed');
        }
    );   

  },  

  generateQuote: function(numb) {

    $('#quote').attr('data-id', $quotesList[numb]['id'])
    $('#quote #text').append($quotesList[numb]['text'])
    $('#quote #number').append($quotesList[numb]['likes'])
    $('#quote #author').append($quotesList[numb]['author'])
  },
  
  addOneLike: function(evt) {
    
    console.log(evt.target)

    // permet de récuperer le nombre de likes du bouton sur lequel on clique
    $numberToChange = $(evt.target).find('#number').text()
    
    // On transforme la string en number pour l'incrémenter d'un point
    $newNumber = parseInt($numberToChange)
    $newNumber++
  
    $(evt.target).find('#number').text($newNumber)

    $('#likes').find('button').addClass('disabled');

    console.log($newNumber)

  }


};
  
  
$(app.init);



  