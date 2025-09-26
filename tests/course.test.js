const { beforeAll, afterAll } = require('@jest/globals');
const mongoose = require('mongoose');

const request = require('supertest');
const { app } = require('../Index');
const Course = require('../Model/Course');

beforeEach(async () => {
  await Course.deleteMany({});
});

describe('Course Endpoints', () => {
  test('should get all courses', async () => {
    const res = await request(app)
      .get('/api/v1/course/getAllCourses');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  test('should get course details', async () => {
    const course = await Course.create({
      courseName: 'Test Course',
      courseDescription: 'Test Description',
      instructor: new mongoose.Types.ObjectId(),
      price: 999,
      tag: ['test'],
      category: new mongoose.Types.ObjectId(),
      status: 'Published'
    });

    const res = await request(app)
      .post('/api/v1/course/getCourseDetails')
      .send({ courseId: course._id });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });
});