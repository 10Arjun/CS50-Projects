Template.forums_create.events({

    // detect form submission event
    'submit form': function(){

        // prevent page reload
        event.preventDefault();

        // save form data
        var title = $('#title').val();
        var content = $('#content').val();
        var timestamp = new Date();
        var tags = $('#tags').val().split(" ").map(function(tag) {return tag.toLowerCase();} );
        var replies = [];

        // validate data for required fields
        if (title === "" || content === "") {
            // on failed validation show error and return
            post_creation_error('All fields are required');
            return;
        }

        // insert post into the collection
        Posts.insert({
            timestamp: timestamp,
            title: title,
            content: content,
            tags: tags,
            replies: replies,
            author: Meteor.userId()

        }, function(error, id) {
            // on fail, show error
            if(error){
                post_creation_error(error.reason);
            }

            // on success, go to the newly-created post
            else {
                Router.go('forums_view', {post_id: id});
            }
        });

    }
});

// display error by updating hide / show and setting alert html
function post_creation_error(error) {
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}
