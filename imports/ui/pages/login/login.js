import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.login.events({
    'submit #login': function (e, temp) {
        e.preventDefault()
        let name = $('#name').val(),
            password = $('#password').val()
        Meteor.loginWithPassword(name, password, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                FlowRouter.go('/home')
            }
        })
    }
})