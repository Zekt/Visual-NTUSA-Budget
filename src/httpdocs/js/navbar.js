/*
File: navbar.js

Description:
    Navigation bar compoent for visual budget application

Authors:
    Ivan DiLernia <ivan@goinvo.com>
    Roger Zhu <roger@goinvo.com>

License:
    Copyright 2013, Involution Studios <http://goinvo.com>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/


var avb = avb || {};

avb.navbar = function(){

	var searchChange = function(){
	    var  keyword = $(this).val();

	    function showResults(){
	        if(avb.navigation !== avb.table){
	            setMode('l');
	        };
	        pushUrl(section, thisYear, 'l', root.hash);
	        avb.navigation.initialize(search(keyword));
	    }

	    clearTimeout(timer);
	    timer = setTimeout( showResults, 300);
	},

	search = function(keyword){
	    var result = [];
	    // aggregate search results from all sections
	    $.each(sections, function(){
	        var searchSection = this;
	        var newResult = searchObject(keyword, data[this]);
	        // remember where searched element was found
	        $.each(newResult, function() {this.section = capitalise(searchSection)});
	        result = result.concat(newResult);
	    });
	    return result;
	},

	searchObject = function(keyword, object){
	    var result = (object.key.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) ? [object] : []; 
	    if(object.sub !== undefined) {
	        for(var i=0; i<object.sub.length; i++) {
	            result = result.concat(searchObject(keyword, object.sub[i]));
	        }
	    }
	    return result;
	},


	initialize = function(){
		
		// year dropdown (desktop browsers)
		$dropdown = $('#yeardrop-container');
		$dropdownLabel = $('#yeardrop-label');
		$dropdownList = $('#yeardrop-list');

		// year selector (mobile browsers)
		$selector = $('#yeardrop-container-mobile');
		if(!jQuery.browser.mobile) {

			$dropdownList.html('');
			for(var i=firstYear; i<=lastYear; i++) {
				var html = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + i +'</a></li>';
				$dropdownList.append(html);
				$dropdownList.find('li :last').click(function(event) {
					event.preventDefault();
					var year = parseInt($(this).text());
					$dropdownLabel.html(year + ' <b class="caret"></b>');
					changeYear(year);
					$dropdown.removeClass('open');
				});
			};
			$dropdownLabel.html(thisYear + ' <b class="caret"></b>');
			$dropdown.show();
		} else {
			$selector.html('');
			for(var i=firstYear; i<=lastYear; i++) {
				var html = '<option'
				+ ((i == thisYear) ? ' selected="selected"' : ' ')
				+ 'value="' + i + '">' + i + '</option>';
				$selector.append(html);
			}
			$selector.change(function(){
				changeYear(parseInt($selector.val()));
			})
			$selector.show();
		}
	};

return{
	initialize : initialize,
	searchChange : searchChange
}
}();