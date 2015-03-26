var schemas = function() {
    var self = this;
    
    var mongoose = require('mongoose');
    
    self.heroSchema = mongoose.Schema({
        name: String,
        subtitle: String,
        type: String,
        isRanged: Boolean
    });
    
    self.counterTipSchema = mongoose.Schema({
        patch: String,
        source: String,
        type: String,
        votes: [ { isUpvote: Boolean, source: String, patch: String } ],
        details: String,
        heroID: String,
    });
    
    self.initModels = function() {
        console.log("Initializing models...");
        
        mongoose.model('Hero', self.heroSchema);
        
        var counterModel = mongoose.model('Counter', self.counterTipSchema);
        
        counterModel.schema.path('type').validate(function (value) {
            return /Counter|Helper/.test(value);
        }, 'Invalid type');
    };
    
    self.updateModels = function() {
        //mongoose.model('Counter').update({}, {type: 'Counter'}).exec();
    };
};

module.exports = schemas;