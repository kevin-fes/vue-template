
/*
 *  使用方法 本插件提供表单常用功能 清空clear  回填fill  校验validate
 *  清空  $('id').webform().clear(); 
 *  回填  $('id').webform().fill(data,cb);
 *  校验  $('id').webform().validate();    // 校验通过返回1  校验失败返回0
 *  校验ui使用bootstrap样式 需要将输入框包裹在 form-group 类名下
 */

;(function($,window,document) {
	var Webform = function(ele,opt){
		this.$element = ele;
    this.options = $.extend({}, this.defaults, opt);
	}
	Webform.prototype = {
			clear:function(){
				this.$element.find('input:not(:checkbox,:radio),textarea').val('');
				this.$element.find('td.show-td').html('');
				this.$element.find('*[data-name]').html('');
				this.$element.find('select > option:first-child').attr('selected','selected');
				this.$element.find(':checkbox,:radio').prop('checked',false);
				this.$element.find('.has-error').removeClass('has-error');
				this.$element.find('.alert').empty().hide();
				this.$element.find('select').change();
			},
			fill:function(record, cb){
        this.clear();
				this._fill(record, cb);
			},
			_fill:function(record, cb){
				this.clear();
				var inputs = this.$element.find('input:not(:checkbox,:radio),select,textarea,label,*[data-name]');
				inputs.each($.proxy(function(idx,input){
					var name = $(input).attr('name');
					if(name) {
						var select = $(input).is('select');
						var value = record[name] || '';
						if(select){//多选下拉框
							if(value && value.constructor == String){
								if(value){
									$(input).find('option').removeAttr('selected');
		    						var val = value.split(',');
		    						if($(input).hasClass('select2-hidden-accessible')){
		    							$(input).select2('val',val);
		    						}else{
		    							for(var i = 0;i<val.length;i++){
			    							$(input).find("option[value='"+val[i]+"']").prop('selected',true);
			    						}
		    						}
		    						
								}
	    					}else{
	    						if($(input).hasClass('select2-hidden-accessible')){
	    							$(input).select2('val',value);
	    						}else{
	    							$(input).val(value);
	    						}
	    					}
						}else{
							$(input).val(value);
						}
					}
				},this));
				
				var checks = this.$element.find(':checkbox,:radio');
				checks.each($.proxy(function(idx,input){
					$(input).prop('checked',false);
					var name = $(input).attr('name');
					var value = $(input).val();
					var values = record[name];
					if(values){
						if(values.constructor == String){
							var val = values.split(',');
							if(val.indexOf(value)!=-1){
								$(input).prop('checked',true);
							}
						}else{
							if(value==values){
								$(input).prop('checked',true);
							}
						}
					}
					
				},this));

				this.$element.find('select').change();
			},
			
			_valiateField:function(field){
				if($(field).is(':hidden') && !$(field).is('textarea')){
					return true;
				}
				
				if($(field).is('select')){
					var has = $(field).find('option').length;
					if(!has){
						if($(field).attr('required')){
							this._setError(field);
							return false;
						}
					}
				}
				if($(field).attr('required') && ($(field).val() ==null || $(field).val().length == 0 )){
					this._setError(field);
					return false;
				}
				
				if($(field).attr('pattern') && !(new RegExp($(field).attr('pattern')).test($(field).val()))){
					this._setError(field);
					return false;
				}
				if($(field).val() && $(field).val().length>0){
					if($(field).data('le')!=null && ($(field).val()>$(field).data('le'))){
						this._setError(field);
						return false;
					}
					if($(field).data('ge')!=null && ($(field).val()<$(field).data('ge'))){
						this._setError(field);
						return false;
					}
					if($(field).data('eq')!=null && ($(field).val()!=$(field).data('eq'))){
						this._setError(field);
						return false;
					}
				}
				this._removeError(field);
				return true;
			},
			_setError:function(field){
				$(field).addClass('has-error');
				$(field).closest('.form-group').addClass('has-error');
			},
			_removeError:function (field){
				$(field).removeClass('has-error');
				$(field).closest('.form-group').removeClass('has-error');
			},
			validate:function(){
				var self = this;
				var right = true;
				
				this.$element.find('input:not(:hidden,:checkbox,:radio,.select2-search__field),select,textarea').each(function(){
					right = self._valiateField(this)&right;
        });
				return right;
			},
		}
	$.fn.webform = function(options){
		var WebForm = new Webform(this,options);
		return WebForm;
	}
})($,window,document)