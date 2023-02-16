import { PostImageCol } from '../../../api/posts/collections'
import './card.html'

Template.card.onCreated(function () {
    const self = this
    self.dirtyData = new ReactiveVar({})
    self.autorun(() => {
        self.dirtyData.set(Template.currentData())
    })
})


Template.card.helpers({
    
    showImage: function () {
        return PostImageCol.findOne({ _id: Template.instance().dirtyData.curValue.postImageId }).link()
    },
    showUser: function () {
        return Meteor.users.find({ _id: Template.instance().dirtyData.curValue.userId })
    }
    ,
    showStatus: function () {
      return Template.instance().dirtyData.curValue.status
    }
})