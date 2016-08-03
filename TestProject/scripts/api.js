/*
 *	author: 	justin williams
 *	desc: 		generic api script for interacting with restful and semi-restful services
 *	date: 		original 11/23/15, updated 8/2/16
 */
define(['jquery'], function($) {

    var Endpoint = {
        validateRequestObj: function(req) {
            if (req && !req.hasOwnProperty('keys')) {
                req.keys = [];
            }
            if (req && !req.hasOwnProperty('error')) {
                req.error = function(xhr, obj) {
                    console.log(xhr.responseText);
                }
            }
            if (req && !req.hasOwnProperty('contentType')) {
                req.contentType = 'application/json'
            }
        },
        replaceFor: function(string, searchFor, replaceWith) {
            var firstHalf = string.substr(0, string.indexOf(searchFor)) + replaceWith;
            var secondHalf = string.substr(string.indexOf(searchFor)+searchFor.length);
            return firstHalf + secondHalf;
        },
        getUrl: function(keys) {
            if (keys && keys.length > 0) {
                for (var n in keys) {
                    this.uri = this.replaceFor(this.uri, '[[key]]', keys[n]);
                }
            }

            this.uri = this.uri.replace('[[key]]', '');

            return this.uri;
        },
        create: function(uri) {
            var newObj = Object.create(this);
            newObj.uri = uri;
            newObj.get = function(req) {
                if (typeof SendRequest === "function") {
                    this.validateRequestObj(req);

                    SendRequest({
                        url: this.getUrl(req.keys),
                        success: req.success
                    }, req);
                }
            };
            newObj.post = function(req) {
                if (typeof SendRequest === "function") {
                    this.validateRequestObj(req);

                    SendRequest({
                        url: this.getUrl(req.keys),
                        method: 'POST',
                        data: JSON.stringify(req.body),
                        contentType: 'application/json',
                        success: req.success
                    }, req)
                }
            };
            newObj.post_form = function(req) {
                if (typeof SendRequest === "function") {
                    this.validateRequestObj(req);

                    SendRequest({
                        url: this.uri,
                        method: 'POST',
                        data: req.data,
                        contentType: false,
                        success: req.success
                    }, req)
                }
            };
            newObj.put = function(req) {
                if (typeof SendRequest === "function") {
                    this.validateRequestObj(req);

                    SendRequest({
                        url: this.getUrl(req.keys),
                        method: 'PUT',
                        data: JSON.stringify(req.body),
                        contentType: 'application/json',
                        success: req.success
                    }, req)
                }
            };
            newObj.delete = function(req) {
                if (typeof SendRequest === "function") {
                    this.validateRequestObj(req);

                    SendRequest({
                        url: this.getUrl(req.keys),
                        method: 'DELETE',
                        contentType: 'application/json',
                        success: req.success
                    }, req)
                }
            };

            return newObj;
        }
    };

    var SendRequest = function(req) {
        $('body').trigger('api_busy');

        $.ajax(req).always(function() {
            $('body').trigger('api_done');

            if (typeof req.always === 'function') {
                req.always();
            }
        });
    }

    var api_version = "";
    var base_url = "http://localhost:8070";

    var getPubApiUrl = function() {
        return base_url + api_version;
    };

    var api_url = getPubApiUrl();

    //	api endpoints, only created when invoked
    return {
        directory: {
            contents: function() {
                return Endpoint.create(api_url + '/directory/contents?path=[[key]]');
            }
        }
    }
});