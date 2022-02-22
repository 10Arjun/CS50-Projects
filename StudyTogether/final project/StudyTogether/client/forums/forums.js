// helper functions to provide data to html template
 Template.forums.helpers({
    //  get posts using function composition to ensure reactive live updates
    posts : function() {
        return getPosts();
    },
    // get set of all unique tags for all posts
    tags : function() {
        var tags = [];

        // iterate over posts, then tags for each post, and push to array
        getPosts().forEach(function(post) {
            post.tags.forEach(function(tag) {
                tags.push(tag);
            });
        });

        // remove duplicates from array and sort alphabetically
        return $.unique(tags).sort();
    }
});

// get posts from local database sorted by timestamp in descending order
function getPosts() {
    return Posts.find({},{sort: {timestamp : -1}}).fetch();
}
