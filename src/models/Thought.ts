import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: [];
};

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280 },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (date: Date) => date.toDateString() 
            },
        username: {
            type: String,
            required: true,
        },
        reactions: [{

        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;