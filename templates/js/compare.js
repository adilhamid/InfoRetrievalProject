/**
  * This method add the view to our compare page.
  * @method addView
  * @param {Array} items : items to be compared.
  */
function addView(items) {
    
    var phones_to_compare = localStorage.getItem('phones').split(',');
    console.log(phones_to_compare[0]);
    console.log(phones_to_compare[1]);
    var common_phones = [];
   
    $.each(items, function(i, value) {
       var full_name = value[0].name.split(" ");
       var name = "";
       for(var i = 1; i < full_name.length; ++i){
            name += (full_name[i] + " ");
       }
       console.log(name);
       // Assuming Only two phones allowed to be compared
       if(phones_to_compare[0] == name) {
          common_phones.push(value);
       } else if(phones_to_compare[1] == name) {
          common_phones.push(value);
       }
    });
   
   addGridViewRow(common_phones,true,'productlist');
   addTableView(common_phones);
}

$(function() {
    // add the header to each page
   $('#header').load('header.html');
   //console.log(localStorage.getItem('phones'));
   
   // make refernce to firbase our backend.
   var ref = new Firebase('https://blinding-heat-6421.firebaseio.com/dummy');

   // asynchronusly fetch the data from the backend.
   ref.on("value", function(snapshot) {
      console.log(snapshot.val()[0][0].price);
      addView(snapshot.val());   
   }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
   });    
});