r360.RadioButtonControl = L.Control.extend({

    initialize: function (options) {

        this.options = r360.config.defaultRadioOptions;

        if ( typeof options !== 'undefined') { 
            
            if ( typeof options.position !== 'undefined' ) this.options.position = options.position;
            if ( typeof options.buttons  !== 'undefined' ) this.options.buttons  = options.buttons;
            else alert("No buttons supplied!");
        }

        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {

        var that = this;

        this.options.map    = map;
        var buttonContainer = L.DomUtil.create('div', this._container);
        this.options.input  = this.getRadioButtonHTML();
        $(buttonContainer).append(this.options.input);

        $(this.options.input).buttonset({}).change(function(){

            that.options.checked = $("input[name='r360_radiobuttongroup_" + that.options.buttonGroupId + "']:checked").attr("key");
            that.options.onChange(that.options.checked);
        });  

        $(this.options.input).each(function(){
            $("[title]").tooltip();   
        }); 

        // prevent map click when clicking on slider
        L.DomEvent.addListener(buttonContainer, 'click', L.DomEvent.stopPropagation);

        return buttonContainer;
    },

    onChange: function (func){

        this.options.onChange = func;      
    },

    getValue: function(){

        return this.options.checked;
    },

    getRadioButtonHTML: function(){

        var that = this; 

        // generate an ID for the complete button group
        that.options.buttonGroupId = r360.Util.generateId(5);

        var div = $('<div/>', { id : that.options.buttonGroupId });

        // add each button to the group
        _.each(that.options.buttons, function(button){

            // generate a unique id for each button
            var id = r360.Util.generateId();

            var input = $('<input/>', { 
                "type" : 'radio', 
                "id"   : 'r360_' + id, 
                "value": button.key, 
                "key"  : button.key, 
                "name" : 'r360_radiobuttongroup_' + that.options.buttonGroupId
            });

            var label = $('<label/>', { 
                "for"  : 'r360_' + id, 
                "text" : button.label
            });

            var checked = '';
            var tooltip = '';

            // make the button selected (default buttin)
            if ( button.checked ) input.attr({"checked" : "checked"});
            // add a tooltip if one was provided
            if ( typeof button.tooltip != 'undefined' ) label.attr({"title" : button.tooltip});

            div.append(input);
            div.append(label);
        });

        return div;
    },
});

r360.radioButtonControl = function (options) {
    return new r360.RadioButtonControl(options);
};