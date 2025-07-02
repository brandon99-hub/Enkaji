(function ($) {
    "use strict";

    var dashboard = {};

    $(document).ready(eltdOnDocumentReady);
    $(window).on('load',eltdOnWindowLoad);
    $(window).resize(eltdOnWindowResize);
    $(window).scroll(eltdOnWindowScroll);

    /**
     * All functions to be called on $(document).ready() should be in this function
     */
    function eltdOnDocumentReady() {
        eltdDashboardInitDatePicker();
        eltdDashboardUploadImages();
        eltdDashboardInitGeocomplete();
        eltdDashboardRemoveMedia();
        eltdDashboardSelect2();
        eltdInitColorpicker();
        //eltdDashboardRepeater();
        eltdInitIconSelectChange();
 	    eltdDashboardRepeater.rowRepeater.init();
 	    eltdDashboardRepeater.rowInnerRepeater.init();
	    eltdDashboardInitSortable();
    }

    /**
     * All functions to be called on $(window).load() should be in this function
     */
    function eltdOnWindowLoad() {
    }

    /**
     * All functions to be called on $(window).resize() should be in this function
     */
    function eltdOnWindowResize() {
    }

    /**
     * All functions to be called on $(window).scroll() should be in this function
     */
    function eltdOnWindowScroll() {
    }

	function eltdDashboardInitDatePicker() {
		$( ".eltd-dashboard-input.datepicker" ).datepicker( { dateFormat: "MM dd, yy" });
	}

	function eltdInitColorpicker() {
		if ( $('.eltd-dashboard-color-field').length  ) {
			$('.eltd-dashboard-color-field').wpColorPicker();
		}
	}

    function eltdInitIconSelectChange() {
        $(document).on('change', 'select.icon-dependence', function (e) {
            var valueSelected = this.value.replace(/ /g, ''),
            	parentSection = $(this).parents('.eltd-dashboard-icon-holder');

            parentSection.find('.eltd-icon-collection-holder').fadeOut();
            parentSection.find('.eltd-icon-collection-holder[data-icon-collection="' + valueSelected + '"]').fadeIn();
        });
    }

	var eltdDashboardRepeater = function() {
		var repeaterHolder = $('.eltd-dashboard-repeater-wrapper'),
			numberOfRows;

		var rowRepeater = function() {

			var addNewRow = function(holder) {
				var $addButton = holder.find('.eltd-dashboard-repeater-add a');
				var templateName = holder.find('.eltd-dashboard-repeater-wrapper-inner').data('template');
				var $repeaterContent = holder.find('.eltd-dashboard-repeater-wrapper-inner');
				var repeaterTemplate = wp.template('eltd-dashboard-repeater-template-' + templateName);

				$addButton.on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();

					var $row = $(repeaterTemplate({
						rowIndex: getLastRowIndex(holder) || 0
					}));

					$repeaterContent.append($row);
					var new_holder = $row.find('.eltd-dashboard-repeater-inner-wrapper');
					eltdDashboardRepeater.rowInnerRepeater.addNewRowInner(new_holder);
					eltdDashboardRepeater.rowInnerRepeater.removeRowInner(new_holder);
					eltdDashboardInitSortable();
					eltdDashboardInitDatePicker();
					eltdDashboardUploadImages();
					eltdDashboardRemoveMedia();
					eltdDashboardSelect2();
					eltdInitColorpicker();
					eltdInitIconSelectChange();
					numberOfRows += 1;       

				});
			};

			var removeRow = function(holder) {

				var repeaterContent = holder.find('.eltd-dashboard-repeater-wrapper-inner');
				repeaterContent.on('click', '.eltd-clone-remove', function(e) {
					e.preventDefault();
					e.stopPropagation();

					if(!window.confirm('Are you sure you want to remove this section?')) {
						return;
					}

					var $rowParent = $(this).parents('.eltd-dashboard-repeater-fields-holder');
					$rowParent.remove();

					decrementNumberOfRows();

				});
			};

			var getLastRowIndex = function(holder) {
				var $repeaterContent = holder.find('.eltd-dashboard-repeater-wrapper-inner');
				var fieldsCount = $repeaterContent.find('.eltd-dashboard-repeater-fields-holder').length;

				return fieldsCount;
			};

			var decrementNumberOfRows = function() {
				if(numberOfRows <= 0) {
					return;
				}

				numberOfRows -= 1;
			}
			var setNumberOfRows = function(holder) {
				numberOfRows =  holder.find('.eltd-dashboard-repeater-fields-holder').length;

			}
			var getNumberOfRows = function() {
				return numberOfRows;
			}

			return {
				init: function() {
					var repeaterHolder = $('.eltd-dashboard-repeater-wrapper');

					repeaterHolder.each(function(){
						setNumberOfRows($(this));
						addNewRow($(this));
						removeRow($(this));
					});
				},
				numberOfRows: getNumberOfRows
			}
		}();

		var rowInnerRepeater = function() {
			var repeaterInnerHolder = $('.eltd-dashboard-repeater-inner-wrapper');


			var addNewRowInner = function(holder) {

				//var repeaterInnerContent = holder.find('.eltd-dashboard-repeater-inner-wrapper-inner');
				var templateInnerName = holder.find('.eltd-dashboard-repeater-inner-wrapper-inner').data('template');
				var rowInnerTemplate = wp.template('eltd-dashboard-repeater-inner-template-' + templateInnerName);
				holder.on('click', '.eltd-inner-clone', function(e) {

					e.preventDefault();
					e.stopPropagation();

					var $clickedButton = $(this);
					var $parentRow = $clickedButton.parents('.eltd-dashboard-repeater-fields-holder').first();

					var parentIndex = $parentRow.data('index');

					var $rowInnerContent = $clickedButton.parent().prev();

					var lastRowInnerIndex = $parentRow.find('.eltd-dashboard-repeater-inner-fields-holder').length;

					var $repeaterInnerRow = $(rowInnerTemplate({
						rowIndex: parentIndex,
						rowInnerIndex: lastRowInnerIndex
					}));

					$rowInnerContent.append($repeaterInnerRow);
					eltdTinyMCE($repeaterInnerRow, lastRowInnerIndex);
				});
			};

			var removeRowInner = function(holder) {
				var repeaterInnerContent = holder.find('.eltd-dashboard-repeater-inner-wrapper-inner');
				repeaterInnerContent.on('click', '.eltd-clone-inner-remove', function(e) {
					e.preventDefault();
					e.stopPropagation();

					if(!confirm('Are you sure you want to remove section?')) {
						return;
					}

					var $removeButton = $(this);
					var $parent = $removeButton.parents('.eltd-dashboard-repeater-inner-fields-holder');

					$parent.remove();
				});
			};

			return {
				init: function() {
					var repeaterInnerHolder = $('.eltd-dashboard-repeater-inner-wrapper');
					repeaterInnerHolder.each(function(){
						addNewRowInner($(this));
						removeRowInner($(this));
					});

				},
				addNewRowInner:addNewRowInner,
				removeRowInner:removeRowInner
			}
		}();

		return {
			rowRepeater: rowRepeater,
			rowInnerRepeater: rowInnerRepeater
		}
	}();

	function eltdDashboardInitSortable() {
		$('.eltd-dashboard-repeater-wrapper-inner.sortable').sortable();
		$('.eltd-dashboard-repeater-inner-wrapper-inner.sortable').sortable();
	}


    // function eltdDashboardRepeater(){
    //     var wrapper = $('.eltd-dashboard-repeater-wrapper');

    //     function initCloneRow(wrapper, button) {
    //         var fieldsHolder = wrapper.find('> .eltd-dashboard-repeater-fields-holder');
    //         var parentChildRepeater = !!fieldsHolder.hasClass('eltd-enable-pc');
    //         var rows;
    //         if(fieldsHolder.hasClass('eltd-table-layout')) {
    //              rows = fieldsHolder.find('tbody tr.eltd-dashboard-repeater-fields-row');
    //         } else {
    //             if(parentChildRepeater) {
    //                 var name = button.data("name");
    //                 rows = fieldsHolder.find('> .eltd-dashboard-repeater-fields-row[data-name=' + name + ']');
    //             } else {
    //                 rows = fieldsHolder.find('> .eltd-dashboard-repeater-fields-row');
    //             }
    //         }
    //         var append = true; // flag for showing or appending new row
    //         if (rows.length == 1 && rows.css('display') == 'none') {
    //             rows.show();
    //             append = false;
    //         }
    //         if (append) {
    //             var child = rows.eq(0);
    //             //FIND FIRST ELEMENT AND DESTROY INITIALIZED SCRIPTS
    //             child.find('.eltd-dashboard-repeater-field').each(function () {
    //                 var thisField = $(this);
    //                 thisField.find('select').each(function () {
    //                     var thisInput = $(this);
    //                     if(thisInput.hasClass('eltd-select2')) {
    //                         $('select.eltd-select2').select2("destroy");
    //                     }
    //                 });
    //             });

    //             var rowIndex = button.data('count'); // number of rows for changing id stored as data of add new button
    //             var firstChild = rows.eq(0).clone(); // clone first row
    //             var colorPicker = false; // flag for initializing color picker - calling wpColorPicker
    //             var mediaUploader = false; // flag for initializing media uploader - calling mediaUploader
    //             var yesNoSwitcher = false; // flag for initializing yes no switcher - calling initSwitch
    //             var select2 = false; // flag for initializing select2 - calling select2
    //             var innerRepeater = false; // flag for initializing select2 - calling select2

    //             firstChild.find('.eltd-dashboard-repeater-field').each(function () {
    //                     var thisField = $(this);
    //                     var id = thisField.attr('id');
    //                     if (typeof id !== 'undefined') {
    //                         thisField.attr('id', id.slice(0, -1) + rowIndex); // change id - first row will have 0 as the last char
    //                     }
    //                     thisField.find(':input, textarea').each(function () {
    //                         var thisInput = $(this);
    //                         if (thisInput.hasClass('eltd-dashboard-gallery-upload-hidden')) {// if input type is media uploader
    //                             mediaUploader = true;
    //                             var btn = thisInput.siblings('.eltd-dashboard-gallery-upload');
    //                             eltdInitMediaRemoveBtn(btn); // get and init new remove btn
    //                         }
    //                         else if(thisInput.hasClass('checkbox')) {
    //                             yesNoSwitcher = true;
    //                         }
    //                         thisInput.val('').removeAttr('checked').removeAttr('selected'); //empty fields values
    //                         if(thisInput.is(':radio')){
    //                             thisInput.val(fieldsHolder.find(':radio').length);
    //                         }
    //                     });
    //                     thisField.find('select').each(function () {
    //                         var thisInput = $(this);
    //                         if(thisInput.hasClass('eltd-select2')) {
    //                             select2 = true;
    //                         }
    //                     });
    //                 }
    //             );
    //             rows.each(function () {
    //                 if($(this).find('.eltd-dashboard-repeater-wrapper').length) {
    //                     innerRepeater = true;
    //                 }
    //             });
    //             button.data('count', rowIndex + 1); //increase number of rows
    //             firstChild.appendTo(fieldsHolder); // append html
    //             initCoreRepeater(firstChild.find('.eltd-dashboard-repeater-wrapper'));
    //             initRemoveRow(firstChild);
    //             if (colorPicker) { // reinit colorpickers
    //                 $('.eltd-page .my-color-field').wpColorPicker();
    //             }
    //             if (mediaUploader) {
    //                 // deregister click on all media buttons (multiple frames will be opened otherwise)
    //                 $('.eltd-media-uploader').off('click', '.eltd-media-upload-btn');
    //                 eltdDashboardUploadImages();
    //                 eltdDashboardRemoveMedia();
    //             }
    //             if (yesNoSwitcher) {
    //                 eltdInitSwitch(); //init yes no switchers
    //             }
    //             if (select2) {
    //                 eltdSelect2(); //init select2 script
    //             }
    //         }

    //         function eltdInitMediaRemoveBtn(btn) {
    //         	var imagesHolder = btn.parents('.eltd-dashboard-gallery-holder').find('.eltd-dashboard-gallery-images-holder'),
    //         		removeButton = btn.siblings('.eltd-dashboard-remove-image');

    //         	btn.removeClass("eltd-binded");
    //         	removeButton.removeClass("eltd-binded");

    //             //remove image src
    //             imagesHolder.empty();

    //             //reset meta fields
    //             btn.siblings('.eltd-dashboard-gallery-upload-hidden').each(function(e) {
    //                 $(this).val('');
    //             });
    //         }
    //     }
    // }

    function eltdDashboardInitGeocomplete() {
        var geo_inputs = $(".eltd-dashboard-address-field");

        if(geo_inputs.length && !eltd.body.hasClass('eltd-empty-google-api')) {
            geo_inputs.each(function () {
                var geo_input = $(this),
                    reset = geo_input.find("#reset"),
                    inputField = geo_input.find('input'),
                    mapField = geo_input.find('.map_canvas'),
                    countryLimit = geo_input.data('country'),
                    latFieldName = geo_input.data('lat-field'),
                    latField = $("input[name=" + latFieldName + "]"),
                    longFieldName = geo_input.data('long-field'),
                    longField =  $("input[name=" + longFieldName + "]"),
                    initialAddress = inputField.val(),
                    initialLat = latField.val(),
                    initialLong = longField.val();

                latField.attr('data-geo','lat');
                longField.attr('data-geo','lng');

                inputField.geocomplete({
                    map: mapField,
                    details: ".eltd-dashboard-address-elements",
                    detailsAttribute: "data-geo",
                    types: ["geocode", "establishment"],
                    country: countryLimit,
                    markerOptions: {
                        draggable: true
                    }
                });

                inputField.on("geocode:dragged", function (event, latLng) {
                    latField.val(latLng.lat());
                    longField.val(latLng.lng());
                    $("#reset").show();
                    var map = inputField.geocomplete("map");
                    map.panTo(latLng);
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': latLng}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var road = results[0].address_components[1].short_name;
                                var town = results[0].address_components[2].short_name;
                                var county = results[0].address_components[3].short_name;
                                var country = results[0].address_components[4].short_name;
                                inputField.val(road + ' ' + town + ' ' + county + ' ' + country);
                            }
                        }
                    });
                });

                inputField.on('focus',function(){
                    var map = inputField.geocomplete("map");
                    google.maps.event.trigger(map, 'resize')
                });
                reset.on("click",function () {
                    inputField.geocomplete("resetMarker");
                    inputField.val(initialAddress);
                    latField.val(initialLat);
                    longField.val(initialLong);
                    $("#reset").hide();
                    return false;
                });

                $(window).on("load",function () {
                    inputField.trigger("geocode");
                })
            });
        }
    }

    function eltdDashboardUploadImages(){
    	var galleries = $('.eltd-dashboard-gallery-uploader');

    	if (galleries.length){
    		galleries.each(function(){
    			var thisGallery = $(this),
    				inputButton = thisGallery.find('.eltd-dashboard-gallery-upload-hidden'),
    				uploadButton = thisGallery.find('.eltd-dashboard-gallery-upload'),
    				thisGalleryImageHolder = thisGallery.parents('.eltd-dashboard-gallery-holder').find('.eltd-dashboard-gallery-images-holder');

    			if (!uploadButton.hasClass("eltd-binded")) {

					inputButton.on("change", function(e){
						var filesNumber = e.target.files.length;

						thisGalleryImageHolder.empty();

						for (var i = 0, file; file = e.target.files[i] ; i++) {

							var reader = new FileReader();

							// Closure to capture the file information.
							reader.onload = (function(theFile) {
								return function(e) {
									if ($.inArray(theFile.type, ["image/gif", "image/jpeg", "image/png"]) != "-1") {
										thisGalleryImageHolder.append('<li class="eltd-dashboard-gallery-image"><img src="' + e.target.result + '" title="' + escape(theFile.name) + '"/></li>');
									} else {
										thisGalleryImageHolder.append('<li class="eltd-dashboard-gallery-image"><span class="eltd-dashboard-input-text">' + escape(theFile.name) + '</span></li>');
									}
								};
							})(file);

							// Read in the image file as a data URL.
							reader.readAsDataURL(file);
						};
					});

					uploadButton.on("click", function(e){
						e.preventDefault();

						inputButton.trigger("click");
					});
					uploadButton.addClass("eltd-binded");
				}

    		});
    	}
    }

    function eltdDashboardRemoveMedia(){
    	var removeMediaBttns = $('.eltd-dashboard-remove-image');

    	if (removeMediaBttns.length){
    		removeMediaBttns.each(function(){
    			var thisRemoveMedia = $(this),
    				removeImagesHolder = thisRemoveMedia.parents('.eltd-dashboard-gallery-holder').find('.eltd-dashboard-gallery-images-holder'),
    				inputHiddenValue = thisRemoveMedia.siblings('.eltd-dashboard-media-hidden');


    			if (!thisRemoveMedia.hasClass("eltd-binded")) {
					thisRemoveMedia.on("click", function(e){
						e.preventDefault();

						inputHiddenValue.val('');

						removeImagesHolder.empty();

					});

					thisRemoveMedia.addClass("eltd-binded");
				}
    		});
    	}
    }


	function eltdDashboardSelect2() {
		if ($('select.eltd-select2').length) {
			$('select.eltd-select2').select2({
                allowClear: true
            });
		}
	}

})(jQuery);