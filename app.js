// On code proprement en JS => module / objet
let app = {
    // Par convention on crée une méthode init
    
    
    init: function() {
      console.log('init');
      
      app.randomBackground();
      //app.loadPhoto();
      
    },

    randomBackground: function() {
      $("#bg").backstretch(["bg.jpg", "bg1.jpg", "bg2.jpg"],
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


};
  
  
$(app.init);



  