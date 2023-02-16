import request from 'supertest';
import sinon from 'sinon';
import express from 'express';
import App from '../app';

describe('app', () => {
  beforeEach(() => {
    sinon.restore();
  });
  afterAll(async () => {
    await App.close();// close the server connection
    // await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should return home page', async () => {
    const response = await request(App).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Welcome to Express');
  });

  it('should return 404 error', async () => {
    const response = await request(App).get('/data');
    expect(response.status).toEqual(404);
    expect(response.text).toContain('Not Found');
  });

  it('should return 500 error', async () => {
    const message = 'custom 500 error';
    const stub = sinon.stub(express.response, 'render').throws(new Error(message));
    const response = await request(App).get('/');
    expect(response.status).toEqual(500);
    expect(response.text).toContain(message);
    expect(stub.callCount).toEqual(2);
  });
});
