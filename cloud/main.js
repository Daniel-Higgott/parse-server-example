
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

Parse.Cloud.beforeSave("Post", function(request, response) {
                       var listIsDraft = request.object.get("listIsDraft");
                       var listUuid = request.object.get("listUuid");
                       if (listIsDraft === true) {
                       
                       query = new Parse.Query("Lists");
                       query.equalTo("uuid", listUuid);
                       query.find({
                                  success: function(results) {
                                  console.log(results);
                                  }
                                  })
                       
                       request.object.set("listIsDraft", false);
                       }
                       response.success();
                       });

Parse.Cloud.afterDelete("Lists", function(request, response) {
console.log("afterDelete RAN");
    var query = new Parse.Query("Posts");
    query.equalTo("parent", request.object);
    query.find({
        success: function(posts) {
            console.log("Found Child Posts");
            console.log(posts);
            Parse.Object.destroyAll(posts, {
                success: function() {
                    console.log("Successfully Deleted Related Posts")
                }
            })
        }
    })
});
