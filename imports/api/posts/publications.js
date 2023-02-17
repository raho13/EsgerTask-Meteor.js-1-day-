import { PostImageCol, PostsCol } from "./collections"

Meteor.publishComposite('showPosts', function (query = {}, limit = 100, skip = 0) {
    return {
        find() {
            return PostsCol.find(query, limit, skip)
        },
        children: [
            {
                find(post) {
                    if (post.postImageId) {
                        return PostImageCol.find({ _id: post.postImageId }).cursor
                    }
                } 
            },
             {
                find(post) { 
                    if (post.userId) {
                        console.log("post.userId", post.userId)
                        return Meteor.users.find({ _id: post.userId })
                    }
                }
            }

        ]
    }
})