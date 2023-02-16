import './navigation.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.navigation.events({
    "click #logout": function (e, temap) {
        Meteor.logout()
        FlowRouter.go('/login')
    }
})