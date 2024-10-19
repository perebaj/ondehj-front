export type Event = {
  _id?: string; // ObjectId as string
  eventDate: Date;
  createdAt: Date;
  description: string;
  name: string;
  instagramURL?: string;
  type?: string;
  clerkId?: string;
  email?: string;
  university?: string;
};
