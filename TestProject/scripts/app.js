// app.js
define([
    'jquery',
    'api',
    'knockout',
    'tree-viewmodel',
    'qparser'
], function($, api, ko, TreeViewModel, qparser) {
    var vm = new TreeViewModel();

    var bindEvents = function() {
        $('.menu_file').unbind('change').bind('change', function(e){
            console.log('changed');
        });
        $('.interface_contents-folder').unbind('click').bind('click', function(e) {
            //	set the selected folder so request can be sent and the breadcrumb can be built
            vm.selected_folder($(this).children('.interface_contents-folder-name').text());

            var next_directory = vm.getNextWorkingDirectory();

            api.directory.contents().get({
                keys: [next_directory],
                success: function(res) {
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
        $('.interface_contents-file').unbind('click').bind('click', function(e) {
            vm.selected_file($(this).children('.interface_contents-file-name').text());

            console.log(vm.selected_file());
        });
        $('.interface_contents-breadcrumb').unbind('click').bind('click', function(e) {
            var target_crumb = $(this).text()

            vm.clearSelectedFolder();
            vm.adjustBreadcrumbs(target_crumb);

            var next_directory = vm.getNextWorkingDirectory();

            api.directory.contents().get({
                keys: [next_directory],
                success: function(res) {
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
            var folder_parts = value.split('|');
            var folder = {
                'name': folder_parts[0],
                'size': folder_parts[1]
            }
            vm.addFolder(folder);
        });

        $.each(res.Files, function(index, value) {
            var file_parts = value.split('|');
            var file = {
                'name': file_parts[0],
                'size': file_parts[1]
            }
            vm.addFile(file);
        });

        bindEvents();
    }
    var init = function() {
        //	get initial querystring if one is present
        var path = "";
    	query_params = qparser.parse(window.location.search);
    	if (query_params.hasOwnProperty('path'))
    	{
    		path = query_params['path'];
    		vm.generateBreadcrumbs(path);
    	}

        //	do the initial data bind
        ko.applyBindings(vm);

        api.directory.contents().get({
        	keys : [path],
            success: function(res) {
                vm.root = res.WorkingDirectory.replace("\\\\", "\\");

                //  dont generate a breadcrumb for root since a path was supplied
                if (path.length < 1) {
                    vm.addBreadcrumb(vm.root);
                }

                render(res);
            }
        });
    }
    return {
        init: init
    }
});