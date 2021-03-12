//AJAX and client side JS


function generateTable()
    {
      console.log('checkout run');
      
      //official jquery ajax function
      $.ajax({
        url: '/getCustomers',
        type: 'GET',
        dataType: 'json', //will parse json into javascript object

        //callback called when successful
        success: (data) => {
          console.log('ajax success!', data);

          //declare output as empty string
          output = '';

          //jquery for each loop
          $.each(data, function (index, value) {
        
            output += "<div>";
            output += "<p>"+ this.customer_id +"</p>";
            output += "<p>"+ this.full_name + "</p>";
            output += "<p>" + this.email + "</p>";
            output += "</div>";
          });// END LOOP

          $('#output').html(output);
   
          //select status id element display in html
        //   $('#results').html(result);
        }//sucess data call
      });//ajax function call
      //CART CLICK AJAX END
    }//cartPopup on click
