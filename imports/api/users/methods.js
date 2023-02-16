import { Accounts } from "meteor/accounts-base"
Meteor.methods({
    AddNewUser: function (data) {
        let result = Accounts.createUser({
            username: data.username,
            email: data.email,
            password: data.password
        })
        return result
    }
})