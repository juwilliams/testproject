define(['knockout'], function(ko) {
    return function treeViewModel() {
        var self = this;

        self.root = "";
        self.working_directory = ko.observable();
        self.breadcrumbs = ko.observableArray();
        self.selected_folder = ko.observable();
        self.selected_file = ko.observable();
        self.folders = ko.observableArray();
        self.files = ko.observableArray();

        self.clearFolders = function() {
            self.folders([]);
        };
        self.clearFiles = function() {
            self.files([]);
        }
        self.clearSelectedFolder = function() {
        	if (self.selected_folder) {
	            self.selected_folder("");
        	}
        };
        self.clearSelectedFile = function() {
            self.selected_file("");
        };

        self.addBreadcrumb = function(crumb) {
            self.breadcrumbs.push(crumb);
        }
        self.adjustBreadcrumbs = function(target_crumb) {
            self.breadcrumbs().splice(self.breadcrumbs().indexOf(target_crumb) + 1, self.breadcrumbs().length - (self.breadcrumbs.indexOf(target_crumb)) + 1);
        }
        self.addFolder = function(dir) {
            self.folders.push(dir);
        }
        self.addFile = function(file) {
            self.files.push(file);
        }

        self.getNextWorkingDirectory = function() {
        	var path = "";

        	if (self.breadcrumbs && self.breadcrumbs().length > 0) {
	        	for (var n in self.breadcrumbs()) {
	        		path += self.breadcrumbs()[n];
	        	}	
        	}        	

        	if (self.selected_folder && self.selected_folder().length > 0) {
	        	path += self.selected_folder();
        	}

        	return path;
        }
    }
});