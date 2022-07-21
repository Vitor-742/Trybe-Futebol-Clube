import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/User'

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const user = {
  username: 'user',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
} as User;

describe('Teste o endpoint de /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(user);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('testa se as propriedades corretas sao retornadas', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@user.com', password: 'secret_user' });

    expect(chaiHttpResponse.body).to.have.property('token')
    expect(chaiHttpResponse.body.token).be.a('string')
  });

  it('testa o status do retorno', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@user.com', password: 'secret_user' });

    expect(chaiHttpResponse).to.have.status(200)
  });

  it('testa o caso do email nao ser passado na requisicao', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ password: 'secret_user' });

    expect(chaiHttpResponse).to.have.status(400)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.equals('All fields must be filled')
  })

  it('testa o caso do password nao ser passado na requisicao', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'user@user.com' });

    expect(chaiHttpResponse).to.have.status(400)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.equals('All fields must be filled')
  })

  it('testa o caso de password nao corresponder ao email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@user.com', password: 'password' });

    expect(chaiHttpResponse).to.have.status(401)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.message).to.equals('Incorrect email or password')
  })

  it('testa o caso de login/validate ser chamado com token correto', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTgyODI4OTN9.6t8KI2xtOM-F88xU4QrRtb56z3ceK0iRV0kAhN2137s'
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set({"Authorization": token})

    expect(chaiHttpResponse).to.have.status(200)
    expect(chaiHttpResponse.body).to.have.property('role')
    expect(chaiHttpResponse.body.role).to.equals('admin')
  })

  it('testa o caso de login/validate ser chamado com token incorreto', async () => {
    const token = 'token_incorreto'
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set({"Authorization": token})

    expect(chaiHttpResponse).to.have.status(400)
    expect(chaiHttpResponse.body).to.have.property('message')
    expect(chaiHttpResponse.body.role).to.equals('Unvalid Token')
  })
});