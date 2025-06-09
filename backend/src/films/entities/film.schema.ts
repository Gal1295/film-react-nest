import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema({ collection: 'films' })
export class Film extends Document {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop() duration?: number;

  @Prop([
    {
      _id: false,
      id: String,
      daytime: String,
      hall: Number,
      rows: Number,
      seats: Number,
      price: Number,
      taken: [String],
    },
  ])
  schedule: {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }[];

  @Prop(String) id: string;
  @Prop(Number) rating: number;
  @Prop(String) director: string;
  @Prop([String]) tags: string[];
  @Prop(String) about: string;
  @Prop(String) image: string;
  @Prop(String) cover: string;
  @Prop([String]) taken: string[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
