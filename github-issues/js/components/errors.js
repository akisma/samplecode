define(
  [
    'app',
    'lodash'
  ],
  function(app, _){
    return {
      hash: {
        //type : message formula
        //login and account creation
        'NotFound':                 {
                                      'User':         'The username and password provided do not match any credentials in our database. Please check the spelling and try again.',
                                      'CreditCard':   'You do not have a credit card associated with your account.',
                                      'AccessToken':  'Your access token is invalid, so you are being logged out. Please log in again.',
                                      'Brand':        'You need to create a brand name by saving this page before you can change your brand name.'
                                    },
                                    
        'AlreadyExists':            { 
                                      'user':  'User already exists.',
                                      'Brand': 'That brand name already exists. Please choose another.' 
                                    },

        'WrongPassword':            'Your original password is wrong. Please double check and try again.',
        'EmailDeliveryError':       'Our system was unable to send an email to the address provided. Please check that it is valid and that your mailbox is not full.',

        //google errors
        'CantConnectToGoogle':      'We couldn\'t connect with Google servers, please try again later.',
        'NoMatch':                  'We couldn\'t find a match for your location. Please check the address and try again.',
        
        //facebook
        'FacebookTokenFail':        'We couldn\'t save your Facebook settings. Please try again.',
        'FacebookNoAuth':           'User cancelled login or did not fully authorize.',
        
        //image errors
        'UnknownImageError':        'We couldn\'t upload your image, sorry. Please try again and check the size and dimension guidelines.',
        'FileUploadTooLarge':       'File size must not exceed 700kb.',
        
        //merchant settings
        'BadCharacters':            'You must use regular characters in your store name.',
        'InventoryError':           'We couldn\'t upload your inventory file, sorry. Please check the formatting and try again.',
        'noBrandOrStore':           'You must fill out My Account, Brand, and Stores sections before proceeding to inventory or orders.',

        //merchant validation
        'WrongVerificationCode':    'The verification code you entered is not recognized by our system.',
        'Server500OrNoTwilio':      'The API has encountered an error, or Twilio cannot be reached to deliver SMS. Please try again later.',

        //input validation
        'MissingParameter':         'The <%= param %> field is required.',
        'InvalidType':              'value is of type <%= is %> but <%= expected %> was expected',
        'InvalidLength':            'length must be between <%= min %> and <%= max %>',
        'InvalidEmail':             '<%= email %>  is not a valid email',

        //product add/edit
        'PhotoIsPrimary':           'This photo can\'t be deleted because it\'s the primary photo for this product. Please use the edit button to replace the photo if you would like to make a change.',

        //global errors
        'APIDown':                  'We couldn\'t connect to our API. Please check your connection and try again.',
        'UnknownFailure':           'We couldn\'t load your data. Please refresh the page and try again.',
        'UnknownError':             'We\'ve encountered an unknown error. Please refresh the page and try again.',
        'InvalidValue':             '<%= param %>: <%= message %>', //this mapping won't work, too many options (lower case, upper case, too high, too low, etc)
        'InvalidLength':            '<%= param %> must be between <%= min %> and <%= max %> characters.',

        //inventory
        'PermissionDenied':         'Products must have at least 1 photo before they can be published.',  

        //credit card
        'CardNumberInvalid':        'The credit card number you have entered is invalid.',
        'CardCVCInvalid':           'The credit card cvc you have entered is invalid.',
        'CardExpiryInvalid':        'The credit card expiration date you have entered is invalid'
      },

      //todo - needs to be double keyed hash, because the entity matters for which message it maps to

      //##_getErrorText
      //obtain error text from internal hash
      _getErrorText: function(error){
        var val = ('entity' in error) ? this.hash[error.type][error.entity] : this.hash[error.type];

        if (!('type' in error)){
          val = error.message;
        }
        
        return (typeof val != 'undefined') ? val : 'An unknown error occurred.';
      },

      //##_replaceErrorText
      //use this to parse the error string with the args passed in
      _replaceErrorText: function(error, formula){
        //parse the formula with the error object based on type
        //run through lodash in case there are vars
        return _.template(formula, error);
      },

      //##issueError
      //display an error alert
      //todo: make this emit an error event to greylog/middleware when ready
      //args
      //either data.error or data.errors must be included
      //{
        //errors: [],
        //error: {}
      //}
      //error objects look like:
      //{
      //  type: 'stringToMatchHashAbove' || other
      //  message: '', if custom message, otherwise this is generally ignored
      //  param: (optional) parameter with error
      //  other attrbs like min, max, etc that come from assurance have been integrated into error messaging, please refer to that documentation
      //}
      issueError: function(data){
        var message = '',
            errorFromHash;

        //multiple, from assurance object
        if ('errors' in data){
          for (var i = 0; i < data.errors.length; i++){
            if (i > 0){
              message += '<br />';
            }
            message += this.getError(data.errors[i]); 
          }
        } else {
        //single, regular path
          errorFromHash = this.getError(data);
          message = (errorFromHash) ? errorFromHash : data.error.message;
        }

        //todo, make it render locally
        //each module should have an error container into which these can be injected
        require(['app'], function(module){
          //spit it out
          module.modal.render({
            headline: 'Error',
            message: message,
            button: 'Dismiss'
          });
        });
        
      },

      //todo add precompilation
      templates: {},

      //##getError
      //made for custom handlers in case they need something special and just want the text
      getError: function(error){
        var formula = this._getErrorText(error);
        return this._replaceErrorText(error, formula);
      }
    };
  }
);