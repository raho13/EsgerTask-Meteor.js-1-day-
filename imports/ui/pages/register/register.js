import './register.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.register.events({
    "submit #register": function (e, temp) {

        e.preventDefault()
        let data = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }
        Meteor.call('AddNewUser', data, function (err, res) {
            if (err) throw err
            else if (res) {
                FlowRouter.go('login')
            }
        })
    }
})