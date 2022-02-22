Template.account.events({
    // detect account form submission event
    'submit #account_change': function() {

        // prevent page from reloading
        event.preventDefault();

        // get data from form fields
        var data = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val()
        };

        // validate data
        if (data.first_name === "" || data.last_name === "") {
                // show error and return on failed validation
                account_error('All fields are required.');
                return;
        }

        // on successful validation, update the user's information in database
        Meteor.users.update(Meteor.userId(), {$set: {profile: data}});

        // display success banner
        account_success("Profile updated successfully.");

    },

    // detect password form submit event
    'submit #password_change': function() {

        // prevent page from reloading
        event.preventDefault();

        // get data from form fields
        var current_password = $('#current_password').val();
        var new_password = $('#new_password').val();
        var new_password_confirmation = $('#new_password_confirmation').val();

        // validate data presence
        if (current_password === "" || new_password === "" || new_password_confirmation === "") {
            // on fail show error and return
            account_error('All fields are required.');
            return;
        }

        // confirm that passwords match
        else if (new_password !== new_password_confirmation) {
            // on fail show error and return
            account_error('The passwords you have entered do not match.');
            return;
        }

        // update user's password in database
        Accounts.changePassword(current_password, new_password, function(error){

            // on fail, display error
            if(error){
                account_error(error.reason);
            }

            // on success, display confirmation
            else {
                account_success("Password changed successfully.");
            }
        });
    }
});

// display error by updating hide / show and setting alert html
function account_error(error) {
    $(".alert-success").hide();
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}

// display success by updating hide / show and setting alert html
function account_success(error) {
    $(".alert-danger").hide();
    $(".alert-success").show();
    $(".alert-success").html(error);
}
