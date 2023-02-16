import { PostsCol } from '../../../api/posts/collections';
import './home.html'


Template.home.onCreated(function () {
    this.autorun(() => {
        this.subscribe('showPosts', { status: true });
    })
})

Template.home.helpers({
    showData() {
        return PostsCol.find()
    }
})