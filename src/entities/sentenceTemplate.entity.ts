import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('sentenseTemplate')
export class SentenceTemplates extends AbstractEntity {}
