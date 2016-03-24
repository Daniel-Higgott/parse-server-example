
Parse.serverURL = 'https://audiotoolbox.herokuapp.com/parse'

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.beforeSave("Lists", function(request, response) {
    var draft = request.object.get("draft");
    if (draft === true) {
        request.object.set("draft", false);
        }
        response.success();
        });

Parse.Cloud.beforeSave("Posts", function(request, response) {
                       var draft = request.object.get("draft");
                       var listUuid = request.object.get("listUuid");
                       if (draft === true) {
                            request.object.set("draft", false);
                            }
                            response.success();
                       });

Parse.Cloud.afterDelete("Lists", function(request) {
    var query = new Parse.Query("Posts");
    query.equalTo("parent", request.object);
    query.find({
        success: function(posts) {
          Parse.Cloud.useMasterKey();
            Parse.Object.destroyAll(posts, {
                success: function() {
                }
            })
        }
    })
});

