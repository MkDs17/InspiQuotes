// On code proprement en JS => module / objet
let app = {
  // Par convention on crée une méthode init
  init: function() {
    console.log('init');
      
    app.randomBackground();
    app.loadQuote();
    //app.loadPhoto();  
  },

  randomBackground: function() {
    $("#bg").backstretch(["bg.jpg", "bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg"],
    {duration: 5000, fade:1500});
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
        console.log(res);
        $.each(res, function(i, quote) 
        {
          $quotesList.push(quote.text)
        })

        app.randomQuote(0)

      }
    ).fail(
        function() 
        {
            alert('Ajax loading failed');
        }
    );

    }, 

    randomQuote: function($id) {
      $('#quote').append($quotesList[$id]);
    }


};
  
  
$(app.init);



  