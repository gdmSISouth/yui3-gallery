YUI.add('gallery-progress-bar', function(Y) {

    Y.ProgressBar = Y.Base.create('progressBar', Y.Widget, [], {

        currentLabel: '',

        _anim: null,


        /** set up **/
        renderUI: function() {
            Y.log('renderUI', 'info', 'Y.ProgressBar');
            this.get('contentBox').append(Y.substitute(this.get('layout'), {
                sliderClass: this.getClassName('slider'),
                labelClass: this.getClassName('label')
            }));
        },

        bindUI: function() {
            Y.log('bindUI', 'info', 'Y.ProgressBar');
            this.after('labelChange', this._updateLabel);
            this.after('progressChange', this._updateBackground);
        },

        syncUI: function() {
            Y.log('syncUI', 'info', 'Y.ProgressBar');
            this._updateBackground();
        },

        /** A little bit of sugar **/
        increment: function(step) {
            Y.log('increment', 'info', 'Y.ProgressBar');
            step = step || 1;
            this.set('progress', this.get('progress') + parseFloat(step, 10));
            return this;
        },

        decrement: function(step) {
            Y.log('decrement', 'info', 'Y.ProgressBar');
            step = step || 1;
            this.set('progress', this.get('progress') - parseFloat(step, 10));
            return this;
        },

        update: function(progress) {
            Y.log('update', 'info', 'Y.ProgressBar');
            this.set('progress', progress);
            return this;
        },

        setLabelAt: function(position, value) {
            Y.log('setLabelAt', 'info', 'Y.ProgressBar');
            var label = this.get('label');
            position = parseFloat(position, 10);
            label[position] = value;
            this.set('label', label);
            return this;
        },

        removeLabelAt: function(position) {
            Y.log('removeLabelAt', 'info', 'Y.ProgressBar');
            var label = this.get('label');
            position = parseFloat(position, 10);
            if (label[position] !== undefined && label[position] !== null) {
                delete label[position];
            }
            this.get('label', label);
            return this;
        },

        /** protected updaters **/
        _updateLabel: function(e) {
            Y.log('_updateLabel', 'info', 'Y.ProgressBar');
            var attrs = this.getAttrs(),
                label = this.get('label'),
                progress = this.get('progress'),
                keys, labelString, i = -1,
                l;

            if (label[progress] !== undefined && label[progress] !== null) {
                labelString = label[progress];
            } else {
                keys = Y.Object.keys(label);
                keys.sort(Y.Array.numericSort);
                l = keys.length;
                while (++i < l) {
                    if (keys[i] <= progress) {
                        labelString = label[keys[i]];
                    }
                }
            }

            attrs.label = labelString || '';
            this.get('contentBox').one('.' + this.getClassName('label')).set('text', Y.substitute(this.get('labelTemplate'), attrs));
        },

        _updateBackground: function(e) {
            Y.log('_updateBackground', 'info', 'Y.ProgressBar');
            var cb = this.get('contentBox'),
                position = cb.get('offsetWidth') * this.get('progress') / 100;

            if (!this._anim) {
                this._makeAnim();
            }

            if (this._anim && this._anim.get('running')) {
                this._anim.pause();
            }
            
            this._anim.set('to.width', position);
            
            this._anim.run();

            this._updateLabel();
        },

        _makeAnim: function() {
            Y.log('_makeAnim', 'info', 'Y.ProgressBar');
            var animConfig = this.get('animation'),
                node = this.get('contentBox').one(this.get('animateNode'));

            animConfig.node = node;

            if (!animConfig.to) {
                animConfig.to = {
                    width: 0
                };
            }
            this._anim = new Y.Anim(animConfig);
        },

        _getAnimateNode: function() {
            return ('.' + this.getClassName('slider'));
        }

    }, {
        ATTRS: {

            animation: {
                value: {
                    easing: Y.Easing.easeIn,
                    duration: 0.5
                }
            },

            animateNode: {
                valueFn: '_getAnimateNode'
            },

/* REMOVED FOR TRANSITION BUG
    transition : {
      value : {
        easing : 'ease-out',
        duration: 0.5
      }
    },
    */

            labelTemplate: {
                value: '{label} - {progress}%'
            },

            label: {
                value: {
                    0: 'Loading',
                    100: 'Complete'
                },
                validator: function(val) {
                    return (Y.Lang.isString(val) || Y.Lang.isObject(val));
                },
                setter: function(val) {
                    if (Y.Lang.isString(val)) {
                        val = {
                            0: val
                        };
                    }
                    return val;
                }
            },

            layout: {
                value: '<div class="{sliderClass} {labelClass}"></div>'
            },

            precision: {
                value: 2,
                setter: function(val) {
                    return parseInt(val, 10);
                }
            },

            progress: {
                value: 0,
                setter: function(val) {
                    var precision = Math.pow(10, this.get('precision'));
                    val = parseFloat(val, 10);
                    if (val < 0) {
                        val = 0;
                    } else if (val > 100) {
                        val = 100;
                    }
                    return Math.round(val * precision) / precision;
                }
            }
        }
    });




}, 'gallery-2010.12.16-18-24' ,{requires:['widget','gallery-effects','substitute']});
