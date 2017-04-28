var per_item = 4;
/**
  * It adds the grid to html page iteratively. In one row global variable per_item decides the maximum number of columns in that row.
  *
  * @method addGridViewIterator
  * @param {Array} items : They are the items to be added to grid view.
  * @param {Boolean} wide_column : Whether to use wide or narrow columns for rows.
  * @param {String} selector : Html node where we want to add the grid view.
  * @param {Boolean} info : Whether to display the addtional info for the grid elements
  */
function addGridViewIterator(items,wide_column, selector,info) {
   var num_rows = 1;
   if((items.length % per_item) == 0) {
      num_rows = items.length / per_item;
   } else {
      num_rows = items.length / per_item + 1;
   } 
   num_rows = parseInt(num_rows);
   console.log(num_rows);
   var counter = 0;
   for(var i = 0; i < num_rows; ++i) {
      console.log(items.length);
      var current_batch = [];
      if((counter + per_item) > items.length) {
         console.log("special case");
         var modulu = items.length % per_item;
         for(var j = counter; j < (counter+modulu); ++j ) {
            current_batch.push(items[j]);
         }
      } else {
         for(var j = counter; j < (counter+per_item); ++j) {
            current_batch.push(items[j]);
         }   
      }
      counter += per_item;
      var currentSelector = selector + (i+1).toString(); 
      addGridViewRow(current_batch,wide_column,currentSelector,info);
   }
}

/**
  * It removes the items from the grid iteratively
  * @method removeGridIterator
  * @param {Array} items : The items to be removed from the grid
  * @param {String} selector : Html node from where we want to remove the grid.
  */
function removeGridIterator(items, selector) {
   var num_rows = 1;
   if((items.length % per_item) == 0) {
      num_rows = items.length / per_item;
   } else {
      num_rows = items.length / per_item + 1;
   }
   
   for(var i = 0; i < num_rows; ++i) {
      var currentSelector = selector + (i+1).toString(); 
       $('#'+currentSelector).empty();
   }
}

/**
  * It is the utility function to add all the checked elements in input to output     
  * @method addToArray
  * @param {Array} input_elements : It contains all the input elements whether checked or unchecked
  * @param {Array} checked_array : The output array of checked items. 
  */
function addToArray(input_elements, checked_array) { 
   for(var i=0; input_elements[i]; ++i){
      if(input_elements[i].checked) {
         checked_array.push(input_elements[i].value);
         //console.log(inputElements[i].value);
      }
   }
}

/**
  * Checks whetther the current item is within range for given type of item. Used to apply boundary filters
  * @method evaluateBoundaries
  * @param {Object} item : it contains the lower and upper limit for the given item type
  * @param {Object} current_item : the item for which we want to chek wheter it is in range or not.
  * @param {Number} type : Type for the item, 1 for price, 2 for screen_size and 3 for camera
  */
function evaluateBoundaries(item, current_item, type) {
   for(var i = 0; i < item.length; ++i) {
      
      var lower = item[i].split(' ')[0];
      var higher = item[i].split(' ')[1];
      var num = null;
      
      if(type == 0) {
         num = Number(current_item[0].price.replace(/[^0-9\.]+/g,""));
      } else if(type == 1) {
         num = Number(current_item[0].screen_size.replace(/[^0-9\.]+/g,""));
      } else if(type == 2){
         num =Number(current_item[0].camera.replace(/[^0-9\.]+/g,""));
      } 
      
      if(num >= Number(lower) && num <= Number(higher)) {
         return true;
      }
   }
   
   return false;
}

/**
  * Add a particular row for the grid view, called by the gridViewIterator.
  * @method addGridViewRow
  * @param {Array} items : They are the items to be added to row.
  * @param {Boolean} wide_column : Whether to use wide or narrow columns for row.
  * @param {String} selector : Html node where we want to add the row.
  * @param {Boolean} info : Whether to display the addtional info for row elements
  */
function addGridViewRow(items,wide_column, selector, info) {
      
   $.each(items, function(i, value) {
      console.log(value);
      var str = "";
      if(wide_column) {
         str += '<div class="col-sm-6 col-md-5"><div class="thumbnail">';
      } else {
         str += '<div class="col-sm-6 col-md-3"><div class="thumbnail">';
      }   
      var company = value[0].name.split(" ")[0];
      var image = value[0].image;
      
      var rating = value[0].rating;    
      rating = rating.split(" ")[0];
      var full_name = value[0].name.split(" ");
     
      var reviews = value[0].reviews_location;
      console.log(image);
      str += '<h4 class="text-center"><span class="label label-info">' + company + '</span></h4>'
      //str += '<div class=caption>'
      str += '<a href = mobile.html?id=' + full_name + ' ><img src='+ image + ' class="img-responsive"></a>'
      str += '<p class="text-center"><b> Click image to get more information!</b></p>';
      str += '<div class="caption"><div class="row">'
      str += '<div class="col-md-6 col-xs-6">';
      var name = "";
     
      for(var i = 1; i < full_name.length; ++i){
         name += (full_name[i] + " ");
      }
      str += '<h4>' + name + '</h4>';
      str += '</div>';
      
      str += '<div class="col-md-6 col-xs-6">';
      str += '<h4>' + value[0].price + '</h4>';
      str += '</div></div>';
      
      var internal_storage = value[0].internal_storage;
      var ram = value[0].ram;
      var screen_size = value[0].screen_size;
      var camera =  value[0].camera.match(/\d+/)[0];
     
      if(info){
         str += '<p class="text-center">';
         str += (ram + ' Ram' + ',  ' + internal_storage + ',  ' + screen_size +  ',  ' + camera + 'MP');
         str += '</p>';
      }
                
      str += '<div class="row">';
      
      str += '<div class="col-md-6 col-xs-6"><a href=mobile.html?id=' + full_name +  ' class="btn btn-success btn-product"><span class="glyphicon glyphicon-book"></span> Reviews</a></div>';
      
      str += '<div class="col-md-6 col-xs-6"><a href="#" class="btn btn-primary btn-product"><span class="glyphicon glyphicon-star"></span> '+ rating + ' / 5.0' +'</a></div>';
      
      str += '</div>';
      
      str += '<br/>';
      
      if(info){
         str += '<label><input type="checkbox" class = "compareCheckbox" value="' + name + '" > Check to compare and click compare button at bottom</label>';   
      }
      
      str += '</div>';    
      
      str += '</div></div>';
      
      $('#'+selector).append(str);
   }); 
}

/**
  * It adds the compare button to given selector.
  * @method addButton
  * @param {String} selector : Html node to which we want to add the compare button
  */
function addButton(selector) {
   $('#hola').append('<div class="panel panel-primary"><div class="text-center"><button class="btn btn-primary btn-block" id ="compareButton">Compare</button></div></div>');
   
   // when the comparison button is clicked get the checked values and save it and redirect.
   $('#compareButton').click(function() {     
      var checkedValues = []; 
      var inputElements = document.getElementsByClassName('compareCheckbox');
      addToArray(inputElements,checkedValues);
      if(checkedValues.length == 0 || checkedValues.length == 1) {
         alert('Please select two smart phones to compare');
      } else if(checkedValues.length > 2) {
         alert('Please select only two smart phones to compare')
      } else {
         localStorage.setItem('phones',checkedValues.toString());
         document.location.href = 'compare.html';   
      }     
   });
}

/**
  * For the table view with given items to table node in the html page.
  * @method addTableView
  * @param {Array} items : The items to be added to table.
  */
function addTableView(items) {
    var str = "";
   
    str += '<tr class=info><th></th><th>';
    str += items[0][0].name;
    str += '</th><th>';
    str += items[1][0].name;
    str += '</th><tr>';
    
    str += '<tr><th>RAM</th><th>';
    str += items[0][0].ram;
    str += '</th><th>';
    str += items[1][0].ram;
    str += '</th><tr>';
   
    str += '<tr><th>Internal Storage</th><th>';
    str += items[0][0].internal_storage;
    str += '</th><th>';
    str += items[1][0].internal_storage;
    str += '</th><tr>';
   
    str += '<tr><th>Screen Size</th><th>';
    str += items[0][0].screen_size;
    str += '</th><th>';
    str += items[1][0].screen_size;
    str += '</th><tr>';
   
    str += '<tr><th>Camera</th><th>'
    var camera =  items[0][0].camera.match(/\d+/)[0] + 'MP';
    str += camera;  
    str += '</th><th>';
    camera = items[1][0].camera.match(/\d+/)[0] + 'MP';
    str += camera;
    str += '</th><tr>';
   
   $('#table').append(str);
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

/**
 * This function add the search bar at the bottom of the mobiles
 * @method addSearchbar
 */
function addSearchbar() {
    $('#searchbar').append('<input type="submit"value="Search" style="float: right" class="btn btn-primary" id = "search" /><div style="overflow: hidden; padding-right: .5em;"><input type="text" style="width: 100%; height: 35px;" placeholder="Search for brand" id ="searchfield" /></div>');
    $('#search').click(function () {
     console.log($('#searchfield').val()); 
     var query = $('#searchfield').val();
     if(query) {
        document.location.href = 'mobiles.html?id=' + query; 
     } else {
        alert('Please enter some value in search bar');
     }      
   });
}

/**
  * Add the initial infromation for device details page.
  * @method addInitialInfo
  * @param {Array} item : The item for which the initial information needs to be added to device detail page.
  */
function addInitialInfo(item) {
   var str = "";
   console.log(item);
    $('#main-image').append('<img id="item-display" src="' + item[0].image+ '" alt=""></img>');
    $('#side-image').append('<a id="item-1" class="service1-item"><img src="' +item[0].image + '" alt=""></img></a><a id="item-2" class="service1-item"><img src="' + item[0].image + '" alt=""></img></a><a id="item-3" class="service1-item"><img src="' + item[0].image + '"></img></a>');
    str += '<div class="product-title">' + item[0].name + '</div>';
    str += '<div class="product-rating"><a href="#" class="btn btn-primary btn-product"><span class="glyphicon glyphicon-star"></span>' + item[0].rating + '</a></div><p></p>';
    str += '<div class="product-price">' + item[0].price + '</div><p></p><a href="' + item[0].reviews_location + '"><div class="btn-group cart"><button type="button" class="btn btn-success">Buy on Amazon </button></div></a>';  
    $('#summary').append(str);
   
    str = "";
    str += item[0].description;
    str += '<h3>' + item[0].name + ' Features: </h3>';
    str += '<li> <b>Screen Size: </b>' + item[0].screen_size + ' inches</li>';
    str += '<li> <b>Ram: </b>' + item[0].ram + '</li>';
    str += '<li> <b>Internal Storage: </b>' + item[0].internal_storage + '</li>';
    str += '<li> <b>Camera: </b>' + item[0].camera + '</li>';
    $('#product-info').append(str);
    
}

/**
  * Add the review infromation for device details page.
  * @method addReviewInfo
  * @param {Array} item : The item for which the review information needs to be added to device detail page.
  */
function addReviewInfo(item) {
    var str = "";
    $.each(item[0].reviews, function(i, value) {
       str = "";
       str += '<p>';
       var num = value.rating.match(/\d+/)[0];
       console.log(num);
       for(var i = 0; i < num; ++i) {
          str += '<i class="fa fa-star gold"></i>';
       }
       str += ' <b>' + value.title + '</b>';
       str += '<ul><li>' + value.description +'</li></ul><p>';
       $('#service-two-id').append(str);
    });
  
}

