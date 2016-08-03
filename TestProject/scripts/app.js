// app.js
define([
	'jquery', 
	'api', 
	'knockout', 
	'tree-viewmodel'
], function($, api, ko, TreeViewModel) {
	var vm = new TreeViewModel();
	
	var bindEvents = function() {
		$('.interface_contents-folder').unbind('click').bind('click', function(e){
			//	set the selected folder so request can be sent and the breadcrumb can be built
			vm.selected_folder($(this).children('span').text().split('|')[0]);

			var next_directory = vm.getNextWorkingDirectory();

			api.directory.contents().get({
				keys : [next_directory],
				success : function(res) {
					//	add the new folder as a breadcrumb item
					vm.addBreadcrumb(vm.selected_folder());

					//	clear the UI
					vm.clearFolders();
					vm.clearFiles();

					//	render the new folder contents
					render(res);
				}
			})
		});
		$('.interface_contents-file').unbind('click').bind('click', function(e){
			vm.selected_file($(this).children('span').text().split('|')[0])

			console.log(vm.selected_file());
		});
		$('.interface_contents-breadcrumb').unbind('click').bind('click', function(e){
			var target_crumb = $(this).text()

			vm.clearSelectedFolder();
			vm.adjustBreadcrumbs(target_crumb);

			var next_directory = vm.getNextWorkingDirectory();

			api.directory.contents().get({
				keys : [next_directory],
				success : function(res) {
					//	add the new folder as a breadcrumb item
					vm.addBreadcrumb(vm.selected_folder());

					//	clear the UI
					vm.clearFolders();
					vm.clearFiles();

					//	render the new folder contents
					render(res);
				}
			})
		});
	}
    var render = function(res) {
        $.each(res.Folders, function(index, value) {
    		vm.addFolder(value);
        });

        $.each(res.Files, function(index, value) {
        	vm.addFile(value);
        });

        bindEvents();
    }
    var init = function() {
    	//	do the initial data bind
    	ko.applyBindings(vm);

        api.directory.contents().get({
            success: function(res) {
            	vm.root = res.WorkingDirectory;
            	vm.addBreadcrumb(vm.root);

                render(res);
            }
        });
    }
    return {
        render: render,
        init: init
    }
});