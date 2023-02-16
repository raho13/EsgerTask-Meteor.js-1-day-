import { PostImageCol } from '../../../api/posts/collections'
import './modal.html'
let isUploadFile = false
Template.modal.onCreated(function () {
    const self = this
    self.currData = new ReactiveVar({});
    this.fileName = new ReactiveVar('');
    self.autorun(() => {
        self.currData.set(Template.currentData())
    })
})
Template.modal.helpers({
    Title: function () {
        return this.clicked_item?.postTitle
    },
    Image: function () {

        if (this.clicked_item?.postImageId) {
            return PostImageCol.findOne({ _id: this.clicked_item?.postImageId }).link()
        }
    },
    Status: function () {
        return this.clicked_item.status
    },
    fileName: function () {
        return Template.instance().fileName.get()
    }
})
Template.modal.events({
    'submit #addPost': function (e, temp) {
        e.preventDefault()
        let file = e.target[1].files[0]
        let title = $('#titleInput').val()
        const upload = PostImageCol.insert({
            file,
            chunkSize: 'dynamic'
        }, false)
        upload.on('start', function () {

        })
        upload.on('end', function (err, file) {
            if (err) console.log(err)
            else {
                let data = {
                    userId: Meteor.userId(),
                    postImageId: file._id,
                    postTitle: title
                }
                Meteor.call('createPost', data, function (err, res) {
                    if (err) console.log(err)
                    else {
                        $('#exampleModalCenter').modal('hide')
                    }
                })
            }
        })
        upload.start()
        isUploadFile = false
        temp.fileName.set('')
    },
    "click .btn-success": function (e, temp) {
        let file = document.getElementById('fileInput').files[0];
        let title = $('#titleInput').val()
        let status = document.getElementById("flexSwitchCheckChecked").checked
        let self = this.clicked_item.id
        if (isUploadFile) {
            Meteor.call('removeImage', temp.data.clicked_item.postImageId, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    const upload = PostImageCol.insert({
                        file,
                        chunkSize: 'dynamic'
                    }, false)
                    upload.on('start', function () {

                    })
                    upload.on('end', function (err, file) {
                        if (err) console.log(err)
                        else {
                            let data = {
                                postId: self,
                                postImageId: file._id,
                                postTitle: title,
                                status: status
                            }

                            Meteor.call('editPost', data, function (err, res) {
                                if (err) console.log(err)
                                else {
                                    $('#exampleModalCenter').modal('hide')
                                }
                            })
                        }
                    })
                    upload.start()
                    temp.fileName.set('')
                }
            })
            isUploadFile = false
        }
        else {
            let data = {
                postId: self,
                postTitle: title,
                status: status
            }
            Meteor.call('editPost', data, function (err, res) {
                if (err) console.log(err)
                else {
                    $('#exampleModalCenter').modal('hide')
                    
                }
            })
            isUploadFile = false
            temp.fileName.set('')
        }
    },
    "change #fileInput": function (e, temp) {
        isUploadFile = true
        temp.fileName.set(document.getElementById('fileInput').files[0].name)
        console.log(URL.createObjectURL(document.getElementById('fileInput').files[0]))
    }


})