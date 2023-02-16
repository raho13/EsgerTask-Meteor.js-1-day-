import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import "../../ui/layout/mainLayout"
import '../../ui/pages/register/register'
import '../../ui/pages/home/home'
import '../../ui/pages/login/login'
import '../../ui/components/card/card'
import '../../ui/pages/profile/profile'
import "../../../public/main"
import '../../ui/components/modal/modal'
import '../../ui/components/navigation/navigation'

FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'register'
        })
    }
})

FlowRouter.route('/home', {
    name: 'home',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'home'
        })
    }
})
FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'login'
        })
    }
})

FlowRouter.route('/profile',{
    name:'profile',
    action(){
        BlazeLayout.render('mainLayout',{
            main:'profile'
        })
    }
})

function trackRouteEntry(context, redirect) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        redirect('/login')
    }
}
FlowRouter.triggers.enter([trackRouteEntry], {
    except: ['login', 'register']
})