import { Schema, model, ObjectId } from 'mongoose';
import moment from 'moment';
import Reaction  from './Reaction';

interface IThought {
    thoughtText: string;
    createdAt?: Date;
    username: string;
    reactions: Array<{
        reactionId: ObjectId;
        
        reactionBody: string;

        username: string;

        createdAt?: Date;
    }>;
};

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280 
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date | undefined) => {
                return timestamp ? moment(timestamp).format('MMMM Do YYYY, h:mm:ss a') : ''
            } 
        },

        username: {
            type: String,
            required: true 
        },

        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;