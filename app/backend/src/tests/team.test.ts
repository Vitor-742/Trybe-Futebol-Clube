import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/Team'

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const team = [
  {
    id: 1,
    teamName: 'Galo'
  },
  {
    id: 2,
    teamName: 'Gremio'
  }
] as Team[];

const team2 = {
  id: 1,
  teamName: 'Galo'
} as Team

describe('Testa o endpoint de /Team', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(team);

      sinon
      .stub(Team, "findOne")
      .resolves(team2);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('testa se todos os times sao retornados com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.body).to.be.a('array')
    expect(chaiHttpResponse.body[0]).to.have.property('teamName')
    expect(chaiHttpResponse.body[0].teamName).to.be.a('string')
  });

  it('testa se todos os times sao retornados com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.body).to.be.a('object')
    expect(chaiHttpResponse.body).to.have.property('teamName')
    expect(chaiHttpResponse.body.teamName).to.be.a('string')
  });
});