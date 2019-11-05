// On code proprement en JS => module / objet
let app = {
    // Par convention on crée une méthode init
    
    
    init: function() {
      console.log('init');
      
    app.launchRun();
      
    },

    launchRun: function() {
      index = 0,
      urls = [
        'bg.jpg',
        'bg1.jpg',
        'bg2.jpg'
      ],

      transition =  function() {
          var url = urls[index];

          $('#bg').css('background-image', 'linear-gradient( rgba(255, 255, 255, .3), rgba(255, 255, 255, 0.5) ), url(' + url + ')');

          index = index + 1;
          if (index > urls.length - 1) {
              index = 0;
          }
      },

      run =  function() {
          transition();
          $('#bg').fadeIn('slow', function() {
              setTimeout(function() {
                $('#bg').fadeOut('slow', run);
              }, 6000);
          });
      },

      run();
    }

};
  
  
$(app.init);



  