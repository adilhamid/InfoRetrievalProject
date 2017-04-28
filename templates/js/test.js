// global list of the urls to fetch from 
var urls = [];
var ebay_urls = []; 
var new_eng_urls = [];

urls.push('http://www.amazon.com/Samsung-Galaxy-G900A-Unlocked-Cellphone/dp/B00K15Q2B0/ref=sr_1_1?s=wireless&ie=UTF8&qid=1456915636&sr=1-1&keywords=16+gb+samsung+galaxy+s5+unlocked');
urls.push('http://www.amazon.com/HTC-32GB-Unlocked-International-Version/dp/B00K6P95N2/ref=sr_1_1?s=wireless&ie=UTF8&qid=1456915717&sr=1-1&keywords=htc+one+m8+32gb+unlocked');
urls.push('http://www.amazon.com/Motorola-Moto-3rd-Generation-Unlocked/dp/B00ZQVSKSM/ref=sr_1_2?s=wireless&ie=UTF8&qid=1456915764&sr=1-2&keywords=8gb+moto+g');
urls.push('http://www.amazon.com/Apple-iPhone-Warranty-Unlocked-Cellphone/dp/B015E8UTIU/ref=sr_1_2?s=wireless&ie=UTF8&qid=1456915797&sr=1-2&keywords=64+gb+iphone+6s');
urls.push('http://www.amazon.com/Samsung-Galaxy-Note-Factory-Unlocked/dp/B013WACF4S/');
urls.push('http://www.amazon.com/HTC-One-Factory-Unlocked-Cellphone/dp/B00CMVLH66');

ebay_urls.push('http://www.ebay.com/itm/NEW-SAMSUNG-GALAXY-S5-SM-G900V-16GB-CHARCOAL-BLACK-VERIZON-Android-SMARTPHONE-/371469207132?hash=item567d4a465c:g:JQwAAOSwo6lWJ~tT');
ebay_urls.push('http://www.ebay.com/itm/HTC-One-M8-OP6B110-16GB-Gunmetal-Gray-Unlocked-Smartphone/161974554000?_trksid=p2045573.c100505.m3226&_trkparms=aid%3D555014%26algo%3DPL.DEFAULT%26ao%3D1%26asc%3D20150817211623%26meid%3D1f80f93d6418468f87d4625bc6937514%26pid%3D100505%26rk%3D1%26rkt%3D1%26');
ebay_urls.push('http://www.ebay.com/itm/Brand-New-Motorola-MOTO-G-Android-XT1032-Black-Unlocked-Smartphone-WIFI-/262293669024?hash=item3d11ebc4a0:g:sooAAOSwqrtWmxcK');
ebay_urls.push('http://www.ebay.com/itm/Apple-iPhone-6S-16GB-Factory-GSM-and-CDMA-Unlocked-Smartphone-/121906496452?var=&hash=item1c623183c4:m:mbKvqYExfzjlvPnuiRZk3KQ');
ebay_urls.push('http://www.ebay.com/itm/New-Samsung-Galaxy-Note-5-SM-N920C-Octa-5-7-FACTORY-UNLOCKED-32GB-Silver-Phone-/281944152107');
ebay_urls.push('http://www.ebay.com/itm/HTC-One-M7-32GB-T-mobile-Unlocked-4G-LTE-with-Beat-Audio-Phone-Silver-NEW-/381532872294');

new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=9SIA3T536K4247&cm_re=samsung_galaxy_s5-_-23B-0002-001P9-_-Product');
new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=N82E16875502228&cm_re=htc_one_m8-_-75-502-228-_-Product');
new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=N82E16875209400&cm_re=moto_g-_-75-209-400-_-Product');
new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=N82E16875100354&cm_re=iphone_6s-_-75-100-354-_-Product');
new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=N82E16875169116&cm_re=galaxy_note_5-_-75-169-116-_-Product');
new_eng_urls.push('http://www.newegg.com/Product/Product.aspx?Item=9SIA2NT0V48702&cm_re=HTC_One_M7-_-9SIA2NT0V48702-_-Product');

var names = ['Samsung Galaxy s5','HTC One M8', 'Motorola Moto G', 'Apple Iphone 6s', 'Samsung Galaxy note 5', 'HTC One M7'];

var SEMANTIC_SERVICE_URL = "http://ecology-service.cse.tamu.edu/BigSemanticsService/";

function getMetadata(url)
{
    var requestURL= SEMANTIC_SERVICE_URL + "metadata.jsonp?callback=" + "metadataCallback" + "&url=" + encodeURIComponent(url);
    var script = document.createElement('script');
    script.src = requestURL;
    document.head.appendChild(script);
    console.log ('inside it'); 
}

function metadataCallback(rawMetadata)
{
   console.log ('inside it');  
   console.log(rawMetadata);
}

$(function () {
  
  var ref = new Firebase('https://blinding-heat-6421.firebaseio.com/');
  var baseUrl = 'http://ecology-service.cs.tamu.edu/BigSemanticsService/metadata.json?url=';
  var i = 0;
  
  while(i < urls.length) {
    var url = baseUrl + urls[i]; 
    var ebay_url = baseUrl + ebay_urls[i];
    var new_eng_url = baseUrl + new_eng_urls[i];
    var dummyRef = ref.child("dummy/" + i.toString());
    
    var price = "0.0";
    var image = null;
    var screen_size = null;
    var camera = null;
    var ram = null;
    var internal_storage = null;
    var reviews_location = null;
    var rating = null;
    $.ajax({
      type: 'GET' ,
      url: url ,
      async: false ,
      success: function(data) {
        console.log('success', data);
        $('body').append('<div id="helloDiv">'+data.amazon_product.reviews_location+'</div>');
        if(data.amazon_product.price) {
          price = data.amazon_product.price; 
        }
        reviews_location = data.amazon_product.reviews_location;
        rating = data.amazon_product.overall_rating;
      }
    });

    $.ajax({
      type: 'GET' ,
      url: ebay_url ,
      async: false ,
      success: function(data) {
        console.log('success', data);
        //$('body').append('<div id="helloDiv">'+data.amazon_product.specifications[0].value+'</div>');
        image = data.ebay_product.main_images[0].location;
      }
    });
    
    $.ajax({
      type: 'GET' ,
      url: new_eng_url ,
      async: false ,
      success: function(data) {
        console.log('success', data);
        screen_size = "0.0";
        screen_size = data.newegg_product.specifications_table[3].specifications[1].value;   
        camera = "0.0";   
        camera = data.newegg_product.specifications_table[4].specifications[0].value;
        ram = "0.0";
        ram = data.newegg_product.specifications_table[5].specifications[5].value;
        internal_storage = "0.0";
        internal_storage = data.newegg_product.specifications_table[5].specifications[6].value;
      }
    });
    
    var obj1 = {name:names[i], price:price, image:image, screen_size: screen_size, camera:camera, ram:ram, internal_storage:internal_storage, reviews_location:reviews_location, rating:rating};
    dummyRef.set({0:obj1});
    i = i + 1;
  }
  
  getMetadata('http://www.ebay.com/itm/Samsung-Galaxy-A7-2016-Duos-SM-A7100-Gold-FACTORY-UNLOCKED-5-5-16GB-13MP-/191823747690?hash=item2ca9961a6a:g:sBQAAOSwv9hW4bwA')
});
