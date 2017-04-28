/**
  * This method add the initial part of the device details page.
  * @method addViewInitial
  * @param {Array} items : items to be added to the initial part of the view.
  */
function addViewInitial(items) {
    var val = getParameterByName('id');
    $.each(items, function(i, value) {
       var full_name = value[0].name.split(" ");
       var name_to_compare = val.split(",");
       var name = "";
       var isSame = false;
       for(var i = 0; i < full_name.length; ++i){
            if(full_name[i] != name_to_compare[i]) {
               isSame = false;
               break;
            }
         isSame = true;
       }
       if(isSame) {
          console.log(val);
          addInitialInfo(value);
       }
       
    });    
}

/**
  * This method add the reviews to the device details page.
  * @method addViewAfter
  * @param {Array} items : items for which reviews has to be added.
  */
function addViewAfter(items) {
    var val = getParameterByName('id');
    var phonesReviews = [];
   
    $.each(items, function(i, value) {
       var full_name = value[0].name.split(" ");
       var name_to_compare = val.split(",");
       var name = "";
       var isSame = false;
       for(var i = 0; i < full_name.length; ++i){
            if(full_name[i] != name_to_compare[i]) {
               isSame = false;
               break;
            }
         isSame = true;
       }
       if(isSame) {
          console.log(val);
          addReviewInfo(value);
       }
    });    
}

$(function() {
    // add the header to each page
   $('#header').load('header.html');
   //console.log(localStorage.getItem('phones'));
   
   var ref1 = new Firebase('https://blinding-heat-6421.firebaseio.com/dummy');
   // asynchronusly fetch the data from the backend.
   ref1.on("value", function(snapshot) {
      addViewInitial(snapshot.val());   
   }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
   });   
   
   // make refernce to firbase our backend for reviews
   var ref = new Firebase('https://reviews123.firebaseio.com/dummy/');
   // asynchronusly fetch the data from the backend.
   ref.on("value", function(snapshot) {
      console.log(snapshot.val()[0][0].name);
      addViewAfter(snapshot.val());   
   }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
   });    
});