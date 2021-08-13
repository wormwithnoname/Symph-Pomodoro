import collections from '../constants/firestore';
import BaseModel from './BaseModel';
import { createOwnerAccess, deleteSnippetAccess } from './SnippetAccessModel';

const collection = collections.SNIPPET;

async function create(data) {
  /* todo: call functions to add snippetID to SnippetAccessModel and to UserModel */
  try {
    await BaseModel.create('code snippets', data).then((docRef) => {
      BaseModel.update('code snippets', { snippetID: docRef.id }, docRef.id);
      createOwnerAccess(docRef.id, data.ownerID);
    });
  } catch (error) {
    console.log(error.message);
    throw new Error('There was an error creating a new Snippet.');
  }
}

function update(data, id) {
  try {
    return BaseModel.update('code snippets', data, id);
  } catch (error) {
    console.log(error.message);
    throw new Error('There was an error updating the Snippet');
  }
}

async function getByRecent(ownerID) {
  try {
    return BaseModel.getByRecent('code snippets', ownerID);
  } catch (error) {
    throw new Error('There was an error getting the Snippets');
  }
}

async function getByID(snippetID) {
  try {
    return BaseModel.getOne('code snippets', snippetID);
  } catch (error) {
    throw new Error('There was an error getting the Snippets');
  }
}

async function getByIDs(ids) {
  try {
    return BaseModel.getSome(collection, ids);
  } catch (error) {
    throw new Error('There was an error getting the Snippets');
  }
}

function remove(id) {
  try {
    BaseModel.remove('code snippets', id);
    deleteSnippetAccess(id);
  } catch (error) {
    console.log(error.message);
    throw new Error('There was an error removing the Snippet');
  }
}

export { create, getByRecent, getByID, getByIDs, remove, update };

/* 
todo:
specialized function for adding snippet content with id
specialized function for adding snippet tag with id
specialized function for updating each field with id
*/
