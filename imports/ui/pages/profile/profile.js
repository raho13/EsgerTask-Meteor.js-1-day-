import { PostsCol } from '../../../api/posts/collections'
import './profile.html'

Template.profile.onCreated(function () {
    this.clicked_item = new ReactiveVar(null)
    this.autorun(() => {
        this.subscribe('showPosts')
    })
})
Template.profile.helpers({
    showdata: function () {
        return PostsCol.find({ userId: Meteor.userId() })
    }
})
Template.profile.events({
    "click .on-btn-click"(e, temp) {
        temp.clicked_item.set(this)
    }
})
Template.profile.helpers({
    clicked_item() {
        return Template.instance().clicked_item.get()
    }
})