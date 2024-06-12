import { Event } from './types/response';
import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import EventModel from '../auth/models/Event';
import { MongoClient, ObjectId } from 'mongodb';


class EventController {
    private eventService: EventService;


    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    getCityByToken = async (req: Request, res: Response) => {
        try {
            const refToken = req.headers.authorization as string;
            console.log(req.headers.authorization);
            const cities = await this.eventService.getCityByToken(refToken);
            console.log(cities);

            res.status(200).json(cities);
        }
        catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    createEvent = async (req: Request, res: Response) => {
        try {
            const event: CreateEventDto = req.body;
            const newEvent = new EventModel(event);
            await newEvent.save();
            res.status(201).json(newEvent);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response) => {
        try {
            const sortBy: string = req.params.sortBy;
            let sortDirection: 1 | -1 = 1;

            if (req.params.sortDirection === 'desc') {
                sortDirection = -1;
            }
            else if (req.params.sortDirection === 'asc') {
                sortDirection = 1;
            }

            const page: any = req.query.p || 0;
            const eventsPerPage = 5;

            const events = await EventModel
                .find()
                .limit(eventsPerPage)
                .sort({ [sortBy]: sortDirection })
                .skip(page * eventsPerPage);

            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    getEventById = async (req: Request, res: Response) => {
        try {
            const eventId = req.params.id;
            const event = await EventModel.findOne({ _id: eventId });
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(event);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default EventController;