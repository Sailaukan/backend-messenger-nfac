import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string,
    description: string,
    location: string,
    duration: string,
    city: string;
}

const EventSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    city: { type: String, required: true }
});

const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;