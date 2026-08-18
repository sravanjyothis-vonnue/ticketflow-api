import request from 'supertest';
import './test-db.js';
import { app } from '../../src/app.js';

export const api = request(app);
