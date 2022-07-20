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

describe('Teste o endpoint de login', () => {
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

//   it('testa o caso de email passado nao estar registrado', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .post('/login')
//        .send({ email: 'user@user.com', password: 'secret_user' });

//     expect(chaiHttpResponse).to.have.status(401)
//     expect(chaiHttpResponse.body).to.have.property('message')
//     expect(chaiHttpResponse.body.message).to.equals('Incorrect email or password')
//   })
});