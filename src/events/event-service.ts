import EventModel from '../auth/models/Event';
import RefreshToken, { IRefreshToken } from '../auth/models/RefreshToken';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  eventsInDatabase: Event[] = [
    {
      id: 1,
      name: "Art Fair",
      description: "Explore the latest works from local and international artists",
      date: new Date(),
      location: "Almaty, KBTU",
      duration: "10:00 AM - 6:00PM"
    },
    {
      id: 2,
      name: "Backend Lecture",
      description: "",
      date: new Date("2024-06-11"),
      location: "Almaty, Satbayev University",
      duration: "9:15 AM - 11:15AM"
    },
    {
      id: 3,
      name: "Demo Day",
      description: "",
      date: new Date("2024-08-09"),
      location: "Almaty, Satbayev University",
      duration: "9:00 AM - 12:00 PM"
    },
  ];

  async getCityByToken(refToken: string) {
    const { user } = await RefreshToken.findOne({ token: refToken }).populate('user') as IRefreshToken; // Assuming you have the user's email or some identifier
    
    if (user) {
      const { city } = user;
      return EventModel.find({ city })
    }
  }

  getEventById(id: number): Event | null {
    return this.eventsInDatabase.find((user) => user.id === id) || null;
  }

  getEvents(): Event[] {
    return this.eventsInDatabase;
  }
}

export default EventService;
