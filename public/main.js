$(document).ready(function () {

  $("#view-work").click(function () {
    location.replace("portfolio.html");
  });

  $("#submit").click(function () {

    function validateForm() {
      
      var isValid = true;

      $("#name").each(function () {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $("#email").each(function () {

        if ($(this).val() === "") {
          isValid = false;
        }
      });
      $("#message").each(function () {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }
    if (validateForm()) {

      // AJAX POST call to the submit route on the server
      // This will take the data from the form and send it to the server
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/submit",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          message: $("#message").val(),
          created: Date.now()
        }
      })
        // If that API call succeeds, add the title and a delete button for the note to the page
        .then(function (data) {
          // Add the title and delete button to the #results section
          console.log(data)
          // Clear the note and title inputs on the page
          $("#name").val("");
          $("#email").val("");
          $("#message").val("");

        });


    } else {
      alert("Please fill in all required fields")
    }

  });



});