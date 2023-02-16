import { FilesCollection } from 'meteor/ostrio:files';

export const PostsCol = new Mongo.Collection('posts')

export const PostImageCol = new FilesCollection({
    collectionName: "postImages",
    allowClientCode: false,
    storagePath: '/home/rahibrzayev/Desktop/postimages',
    onBeforeUpload(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
})
