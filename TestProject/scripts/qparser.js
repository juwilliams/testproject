define(function() {
    return {
        parse: function(querystring) {
            if (typeof querystring != "string" || querystring.length == 0) return {};
            querystring = querystring.replace('?', '');

            var params = querystring.split("&");
            var param, parsed = {}, key, value;

            for (var i = 0; i < params.length; i++) {
                param = params[i].split("=");

                key = decodeURIComponent(param[0]);
                if (key.length == 0) {
                    continue;
                }

                value = decodeURIComponent(param[1]);
                if (typeof parsed[key] == "undefined") {
                    parsed[key] = value;
                } else if (parsed[key] instanceof Array) {
                	parsed[key].push(value);
                } else {
                    parsed[key] = [parsed[key], value];
                }
            }

            return parsed;
        }
    }
});