// helper functions to provide data to html template
Template.forums_tag.helpers({
    //  get posts using function composition to ensure reactive live updates
    posts : function() {
        return getPosts();
    }
});

// get posts from local database sorted by timestamp in descending order
function getPosts() {
    return Posts.find({},{sort : {timestamp : -1}}).fetch();
}
