// on template creation, ensure that post is valid
Template.forums_view.created = function () {

    // get post from database using helper function
    post = getPost();

    // if post doesn't exist, redirect to not found page
    if (!post)
    {
        Router.go('notfound');
    }

};

// on template render, update display of elements
Template.forums_view.rendered = function() {

    // if current user is post author allow deletion
    if (getPost().author === Meteor.userId()) {
        $("#delete").show();
        $("#delete").prop('disabled', false);
    }

};

Template.forums_view.events({

    // detect reply form submission event
    'submit form': function() {

        // prevents page reload
        event.preventDefault();

        // collect form data
        var reply = {
            timestamp: new Date(),
            author: Meteor.userId(),
            content: $('#reply').val()
        };

        // validate data
        if (reply.content === "")
        {
            // on fail display error and return
            post_view_error("Please fill in the required fields.");
            return;
        }

        // insert reply into database, display success, and clear form
        Posts.update({"_id": getPost()._id}, {$push: {replies: reply} });
        post_view_success("Reply posted successfully.");
        $('#reply').val("");

    },

    // detect delete button click
    'click #delete': function() {

        // check user's authorization
        if (post.author !== Meteor.userId()) {
            // if user is not post author, display error and return
            post_view_error("You are not authorized to delete this post.");
            return;
        }

        // remove post from database and redirect to forums homepage
        Posts.remove({"_id": post._id});
        Router.go("forums");

    }
});

// helper functions to provide data to html template
Template.forums_view.helpers({
    //  get post using function composition to ensure reactive live updates
    post : function() {
        return getPost();
    }
});

// get post from local database
function getPost() {
    var post = Posts.findOne();
    return post;
}

// display error by updating hide / show and setting alert html
function post_view_error(error) {
    $(".alert-success").hide();
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}

// display success by updating hide / show and setting alert html
function post_view_success(error) {
    $(".alert-danger").hide();
    $(".alert-success").show();
    $(".alert-success").html(error);
}
