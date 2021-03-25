//AJAX and client side JS

//login function needs fixed


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
      
        data = {};
        const key1 = $('#full_name').attr('name');
        const key2 = $('#email').attr('name');
        const key3 = $('#password').attr('name');

        const value1 = $('#full_name').val();
        const value2 = $('#email').val();
        const value3 = $('#password').val();


        data[key1] = value1;
        data[key2] = value2;
        data[key3] = value3;

        //jquery ajax post function
        $.ajax(
        {
          url: '/addCustomer',
          type: 'POST',
          dataType: 'json', //will parse json into javascript object
          data: data,
  
          //callback called when successful
          success: (data) => {
            console.log('ajax post success!', data);

          }//sucess data call
        });//ajax function call
        
      }//cartPopup on click








 function addJournalEntry() 
    {
      
        data = {};
        const key1 = $('#journal_entry_date').attr('name');
        const key2 = $('#journal_entry').attr('name');

        const value1 = $('#journal_entry_date').val();
        const value2 = $('#journal_entry').val();

        data[key1] = value1;
        data[key2] = value2;

        //jquery ajax post function
        $.ajax(
        {
          url: '/addJournalEntry',
          type: 'POST',
          dataType: 'json', //will parse json into javascript object
          data: data,
  
          //callback called when successful
          success: (data) => {
            console.log('ajax post success!', data);

          }//sucess data call
        });//ajax function call
        
      }//cartPopup on click





      function customerLogin() {
        const email = $("#email").val();
        const password = $("#email").val();

        const params = {
          email: email,
          password: password
        };

        $.post("/customerLogin", params, function(result) {
          console.log('result: ', result.success);
          if (result && result.success) {
            $("#status").text("Successfully logged in.");
            
          } else {
            $("#status").text("Error logging in.");
          }
        });
      }


​
function customerLogout() {
  // console.log("inside javascript Logout");
	$.post("/customerLogout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}



      // function customerLogin() {

      //   data = {};
      //   const key1 = $('#email').attr('name');
      //   const key2 = $('#password').attr('name');

      //   const value1 = $('#email').val();
      //   const value2 = $('#password').val();


      //   data[key1] = value1;
      //   data[key2] = value2;

      //   //jquery ajax post function
      //   $.ajax(
      //   {
      //     url: '/customerLogin',
      //     type: 'GET',
      //     dataType: 'json', //will parse json into javascript object
      //     data: data,
  
      //     //callback called when successful
      //     success: (data) => {
      //       console.log('ajax post success!', data);

      //     }//sucess data call
      //   });//ajax function call
      // }
