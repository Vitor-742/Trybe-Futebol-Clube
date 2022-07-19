// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import User from '../database/models/User'

// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// const user = {
//   username: 'fulano',
//   role: 'helper',
//   email: 'fulano@gmail.com',
//   password: '123456'
// } as User;

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(User, "findOne")
//       .resolves(user);
//   });

//   after(()=>{
//     (Example.findOne as sinon.SinonStub).restore();
//   })

//   it('...', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .post('/login')
//        .send({ email: 'admin@admin.com', password: 'secret_admin' });

//     expect(...)
//   });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });