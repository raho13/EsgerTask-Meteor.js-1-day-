import { PostImageCol, PostsCol } from "./collections"

Meteor.methods({
    createPost: function ({ userId, postImageId, postTitle }) {
        return PostsCol.insert({
            userId,
            postImageId,
            postTitle,
            status: true
        })
    },
    removeImage: function (data) {
        PostImageCol.remove({ _id: data }, (error) => {
            if (error) {
                return `File wasn't removed, error:  ${error.reason}`
            } else {
                return 'File successfully removed'
            }
        });
    },
    editPost: function ({ postImageId, postTitle, status, postId }) {
        if (postImageId) {
            return PostsCol.update({ _id: postId }, { $set: { postImageId, postTitle, status } })
        } else {
            return PostsCol.update({ _id: postId }, { $set: { postTitle, status } })

        }
    }
})