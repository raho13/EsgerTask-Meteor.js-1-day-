import { PostsCol } from '../../../api/posts/collections'
import './profile.html'

Template.profile.onCreated(function () {
    this.clicked_item = new ReactiveVar(null)
    this.query = new ReactiveVar({ userId: Meteor.userId() })
    let self = this
    this.autorun(() => {
        this.subscribe('showPosts', self.query.get())
    })
})
Template.profile.helpers({
    showdata: function () {
        return PostsCol.find(Template.instance().query.get())
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