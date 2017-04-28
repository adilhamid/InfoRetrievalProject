//globals
//filters 
var price_obj = {0:' Below $200' ,1:' $200 - $300',2:' $300 & Above'};
var price_array_helper = ['0 200','200 300','300 1000'];

var ram_obj = {0:' 1GB',1:' 2GB', 2: ' 3GB', 3:' 4GB'};
var ram_helper_array = [1,2,3,4];

var screen_size_obj = {0:' 4.3 - 4.7 inch', 1:' 4.7 - 5.7 inch', 2:' 5.7 inch & Above'};
var screen_helper_array = ['4.3 4.7', '4.7 5.7','5.7 6.7'];

var camera_obj = {0:' Upto 2MP', 1:' 2.0 - 5.0 MP', 2:' 5.0 - 8.0 MP',3:' 8.0 MP & Above'};
var camera_helper = ['0 2','2 5','5 8','8 30'];

var internal_storage = {0:' 8GB', 1:' 16 GB', 2:' 32 GB', 3:' 64 GB'};
var internal_storage_helper = [8,16, 32, 64];

var overall_helper = ['0 200','200 300','300 1000', 1, 2,3,4, '4.3 4.7', '4.7 5.7', '5.7 6.7', '0 2','2 5','5 8','8 30', 8, 16, 32, 64];
var all_items = null;


var filter_obj = {'Price':price_obj,
                  'RAM':ram_obj,
                  'Screen Size':screen_size_obj,
                  'Camera':camera_obj,
                  'Internal Storage':internal_storage
                 };

/**
  * It apply the filters where we need to get the exact value for the facet. for example a particular value for RAM
  * @method checkforEqualityFilter
  * @param {Object} current_item : 
  * @param {Array} ram : List of ram value
  * @param {Array} internal_storage : List of internal storage values
  */
function checkforEqualityFilter(current_item,ram,internal_storage){
   var ram_true = false;
   var internal_storage_true = false;
   
   if(ram.length == 0) {
      ram_true = true;
   } 
   
   if(internal_storage.length == 0) {
      internal_storage_true = true;
   }
   
   for(var i = 0 ; i < ram.length; ++i) {
      if(current_item[0].ram.match(/\d+/)[0] == ram[i]) {
         ram_true = true;
      }
   }
   
   for(var i = 0 ; i < internal_storage.length; ++i) {
      if(current_item[0].internal_storage.match(/\d+/)[0] == internal_storage[i]) {
         internal_storage_true = true;
      }
   }
   
   return (ram_true && internal_storage_true);
}

/**
  * It apply the filters where we need to check in range for the facet. for example a particular value for Price range
  * @method checkforRange
  * @param {Object} current_item : 
  * @param {Array} price : List of price ranges
  * @param {Array} screen : List of screen size ranges
  * @param {Array} camera : List of camera ranges
  */
function checkforRange(current_item, price,screen,camera) {
   var price_true = false;
   var screen_true = false;
   var camera_true = false;
   
   if(price.length == 0) {
      price_true = true;
   }
   
   if(screen.length == 0) {
      screen_true = true;
   }
   
   if(camera.length == 0) {
      camera_true = true;
   }
   
   if(evaluateBoundaries(price, current_item,0)) {
      price_true = true;
   }
   
   if(evaluateBoundaries(screen,current_item,1)) {
      screen_true = true;
   }
   
   if(evaluateBoundaries(camera, current_item,2)) {
      camera_true = true;
   }

   return (price_true && screen_true && camera_true);
}

/**
  * It apply all the filters specfied by the user
  * @method applyFilters
  * @param {Array} price : List of price ranges
  * @param {Array} ram : List of ram value
  * @param {Array} screen : List of screen size ranges
  * @param {Array} camera : List of camera ranges
  * @param {Array} internal_storage : List of internal storage values
  */
function applyFilters(price, ram, screen, camera, internal_storage) {
   var filtered_phones = [];
   
   $.each(all_items, function(i, value) {
      if(checkforEqualityFilter(value, ram, internal_storage) && checkforRange(value, price, screen, camera)){
         filtered_phones.push(value);
      }
   });
   console.log(filtered_phones);
   if(filtered_phones.length == 0) {
      $('#productlist1').append('<h4><b>No Matches Found</b></h4>');
   }
   addGridViewIterator(filtered_phones,false,"productlist",true);
}

/**
  * It add the filter option in the left pane
  * @method addFilters
  */
function addFilters() {
    // inject the filters  
   var count_filters = 0; 
   $.each(filter_obj, function(i,val) {
      $('#filters').append('<li class="sidebar-brand"><p class="text-primary" id ="heading"><label><b>'+i+'</b></label><p></li>');
      $.each(val, function(inner_i, inner_val) {
         $('#filters').append('<li class="sidebar-brand"><label><input type="checkbox" class="' + i + '" value="' + overall_helper[count_filters] + '">'+ inner_val + '</label></li>');
         ++count_filters;
      });
      $('#filters').append('<br />');
   });
   
   // add the button for submittind filter
   $('#filters').append('<li class="sidebar-brand"><button type="submit" class="btn btn-primary" id="button">Apply</button></li>');
   
   $('#button').click( function(){
      //$('#productlist').empty();
      
      var inputElements = document.getElementsByClassName('Price');
      
      // get the prices which are checked for filtering. 
      var checked_price = []; 
      addToArray(inputElements,checked_price);
      console.log(checked_price);
      
      inputElements = document.getElementsByClassName('RAM');
      // get the RAM
      var checked_ram = [];
      addToArray(inputElements,checked_ram);
      console.log(checked_ram);
      
      inputElements = document.getElementsByClassName('Screen Size');
      // get the screen options checked.
      var checked_screen = [];  
      addToArray(inputElements,checked_screen);
      console.log(checked_screen);
      
      inputElements = document.getElementsByClassName('Camera');
      // get the camera
      var checked_camera = [];
      addToArray(inputElements,checked_camera);
      console.log(checked_camera);
      
      inputElements = document.getElementsByClassName('Internal Storage');
      // get the internal storage
      var checked_storage = [];
      addToArray(inputElements, checked_storage);
      console.log(checked_storage);
      if(checked_price.length == 0 && checked_ram.length == 0 && checked_screen.length == 0 && checked_camera.length == 0 && checked_storage.length == 0){
         removeGridIterator(all_items,'productlist');
         addGridViewIterator(all_items, false, 'productlist', true);
      } else {
         removeGridIterator(all_items,'productlist');
         //$('#hola').empty();
         applyFilters(checked_price, checked_ram, checked_screen, checked_camera, checked_storage);
      }
   });
}

/**
  *To get the parameter by name for the url
  * @method getParameterByName
  * @param {String} name : name of the parameter
  * @param {String} url : the url from whihc we want to get the parameter
  */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {   
   var ref = new Firebase('https://blinding-heat-6421.firebaseio.com/dummy');
   
   // add the header to each page
   $('#header').load('header.html');
   
   // asynchronusly fetch the data from the backend.
   ref.on("value", function(snapshot) {
      console.log(snapshot.val()[0][0].price);
      all_items = snapshot.val();
      addFilters();
      
      console.log(getParameterByName('id'));
      if(getParameterByName('id')) {
         var query = getParameterByName('id');
         var phones = [];
         $.each(snapshot.val(), function(i, value) {
            if(value[0].name.toLowerCase().indexOf(query.toLowerCase()) != -1){
               phones.push(value)
            }
         });
         addGridViewIterator(phones, false,"productlist",true);
         all_items = phones;
         if(phones.length != 0) {
            addButton('hola');
         }
      } else {
         addGridViewIterator(snapshot.val(), false,"productlist",true);  
         addButton('hola');
      }    
      
      addSearchbar();
      
   }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
   });
  
});
