(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var NUM_SELECTOR= '#strengthLevelNumber'
  var SLIDER_SELECTOR = '#strength';

  function FormHandler(selector){
    if (!selector){
      throw new Error('No selector provided');
    }
  this.$formElement = $(selector);
  if (this.$formElement.length === 0) {
    throw new Error('Could not find element with selector: ' + selector);
  }
  this.$numElement = $(NUM_SELECTOR);
  this.$sliderElement = $(SLIDER_SELECTOR);
}

FormHandler.prototype.addSubmitHandler = function (fn) {
  var form = this;
  console.log('Setting submit handler for form');
  this.$formElement.on('submit', function (event){
    event.preventDefault();

    var data = {};
    $(this).serializeArray().forEach(function (item){
      data[item.name] = item.value;
      console.log(item.name + ' is ' + item.value);
    })
    // console.log(data);
    fn(data);
    this.reset();
    this.elements[0].focus();
    // form.changeColor(parseInt($(form.$sliderElement).val()));
  });
};

FormHandler.prototype.addInputHandler = function (fn) {
  console.log('Setting input handler for form');
  this.$formElement.on('input', '[name="emailAddress"]', function (event) {
    var emailAddress = event.target.value;
    var message = '';
    if (fn(emailAddress)) {
      event.target.setCustomValidity('');
    } else {
      message = emailAddress + ' is not an authorized email address!'
      event.target.setCustomValidity(message);
    }
  }); 
}

//Grabbed from GitHub (MapleSun)

// FormHandler.prototype.changeColor = function (strength) {
//     var textColor;
//     if (strength < 34) {
//         var green = 200+strength;
//         textColor = 'rgb(0,' +green+ ',0)';
//     } else if (strength > 33 && strength < 67) {
//         var yellow = 255-strength;
//         textColor = 'rgb('+yellow+','+yellow+',0)';
//     } else {
//         var red = 155+strength;
//         textColor = 'rgb('+red+',0,0)';
//     }
//     console.log(textColor);
//     this.$numElement.css('color',textColor);
//     this.$numElement.text(strength);
// };

// FormHandler.prototype.addSliderHandler = function (){
//     //var form = this;
//     var slider = this.$sliderElement;
//     this.changeColor(parseInt(slider.val()));
//     slider.on('change', function (event){
//         event.preventDefault();
//         this.changeColor(parseInt(slider.val()));
//     }.bind(this));
//
// };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
