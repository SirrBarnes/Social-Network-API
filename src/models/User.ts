import { Schema, model, Document, ObjectId } from 'mongoose';

const validateemail = function(email: string) {
    const value = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return value.test(email);
}

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends?: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },

        email: { 
            type: String, 
            unique: true, 
            required: true, 
            validate: [validateemail, 'Please enter a valid email'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'
            ]},

        thoughts: [
            { 
                type: Schema.Types.ObjectId, 
                ref:'Thought' 
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' 
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

const User = model('User', userSchema);

export default User;