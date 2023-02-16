import "./mainLayout.html"

Template.mainLayout.helpers({
    check: function () {
        return Meteor.user()
    }
})