//AJAX and client side JS


function generateTable()
    {
    //   console.log('checkout run');
      
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
      
    }//cartPopup on click





//Journal Display
function generateJournal()
    {
    //   console.log('checkout run');
      
      //official jquery ajax function
      $.ajax({
        url: '/getJournal',
        type: 'GET',
        dataType: 'json', //will parse json into javascript object

        //callback called when successful
        success: (data) => {
          console.log('ajax success!', data);

          //declare output as empty string
          outputJournal = '';
          outputJournal += "<table class='journal-display'>";
          outputJournal += "<tr>";
          outputJournal += "<th>Journal ID</th>";
          outputJournal += "<th>Journal Entry</th>";
          outputJournal += "<th>Journal Entry Date</th>";
          outputJournal += "<th>Customer ID</th>";
          outputJournal += "</tr>";
          //jquery for each loop
          $.each(data, function (index, value) {

            outputJournal += "<tr><td>"+ this.journal_id +"</td>";
            outputJournal += "<td>"+ this.journal_entry + "</td>";
            outputJournal += "<td>" + this.journal_entry_date + "</td>";
            outputJournal += "<td>" + this.customer_id + "</td></tr>";
            
          });// END LOOP
          outputJournal += "</table>";
          $('#outputJournal').html(outputJournal);
   
          //select status id element display in html
        //   $('#results').html(result);
        }//sucess data call
      });//ajax function call
      
    }//cartPopup on click








    function addCustomer() 
    {
        // console.log('checkout run');
      
        //official jquery ajax function
        $.ajax({
          url: '/addCustomer',
          type: 'POST',
          dataType: 'json', //will parse json into javascript object
  
          //callback called when successful
          success: (data) => {
            console.log('ajax success!', data);

  
            //declare output as empty string
            input = '';
  
            //jquery for each loop
            $.each(data, function (index, value) {
          

              input += this.full_name;
              input += this.email;
              output += this.password;
            });// END LOOP
  
            $('#input').html(input);
     
            //select status id element display in html
          //   $('#results').html(result);
          }//sucess data call
        });//ajax function call
        
      }//cartPopup on click
