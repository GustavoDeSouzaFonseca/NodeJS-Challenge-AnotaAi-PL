/* eslint-disable no-underscore-dangle */
import assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 8080;

let categoryId;

describe('Should be pass all tests from category controller', () => {
  before(async () => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/categories/?title=Brazilian foods`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const receivedResult = await response.json();

      if (receivedResult) {
        categoryId = receivedResult[0]._id;
        await fetch(`${BASE_URL}:${PORT}/categories/${categoryId}`, {
          method: 'DELETE',
        });
        console.log('Dropped test Brazilian foods');
      }
    } catch (err) {
      console.error(err);
    }
  });

  it('Should be inform that any categories are registered', async () => {
    const expected = {
      message: 'Any category registered',
      status: 404,
    };

    const response = await fetch(`${BASE_URL}:${PORT}/categories`);
    const receivedResult = await response.json();

    assert.deepStrictEqual(receivedResult, expected);
  });

  it('Should be create a category', async () => {
    const expected = {
      title: 'Brazilian foods',
      description: 'Foods that Brazilian people eat',
      ownerId: '1',
    };

    const response = await fetch(
      `${BASE_URL}:${PORT}/categories`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Brazilian foods',
          description: 'Foods that Brazilian people eat',
          ownerId: '1',
        }),
      },
    );

    const receivedResult = await response.json();

    assert.strictEqual(receivedResult.title, expected.title);
    assert.strictEqual(receivedResult.description, expected.description);
    assert.strictEqual(receivedResult.ownerId, expected.ownerId);

    categoryId = receivedResult._id;
    assert.ok(receivedResult._id);
  });

  it('Should not be create a existed category', async () => {
    const expected = {
      message: 'Brazilian foods already exists',
      status: 409,
    };

    const response = await fetch(`${BASE_URL}:${PORT}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Brazilian foods',
        description: 'Foods that Brazilian people eat',
        ownerId: '1',
      }),
    });

    const receivedResult = await response.json();
    assert.deepStrictEqual(receivedResult, expected);
  });

  it('Should be list all categories', async () => {
    const response = await fetch(`${BASE_URL}:${PORT}/categories`);
    const receivedResult = await response.json();

    assert(Array.isArray(receivedResult));

    receivedResult.forEach((category) => {
      assert.ok(category.title);
      assert.ok(category.description);
      assert.ok(category.ownerId);
      assert.ok(category._id);
    });
  });

  it('Should be updated category by id', async () => {
    const expected = {
      _id: categoryId,
      title: 'Japanese foods',
      description: 'Foods that Japanese people eat',
      ownerId: '1',
    };

    const response = await fetch(`${BASE_URL}:${PORT}/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Japanese foods',
        description: 'Foods that Japanese people eat',
      }),
    });
    const receivedResult = await response.json();

    assert.deepStrictEqual(receivedResult, expected);
  });

  it('Should be delete the updated category', async () => {
    const expected = `Category ${categoryId} was deleted`;
    const response = await fetch(`${BASE_URL}:${PORT}/categories/${categoryId}`, { method: 'DELETE' });
    const receivedResult = await response.text();

    assert.strictEqual(receivedResult, expected);
  });
});
