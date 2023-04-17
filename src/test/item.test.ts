const listHelper = require('../utils/list_helper')
import { Request, Response } from "express";
import mongoose, { Types } from 'mongoose';
const supertest = require('supertest');
import  {app} from '../app';
import { Controller as ItemController } from "../modules/items/item.controller";

// import {Item} from '../modules/items/item.model';
const api = supertest(app);

test('dummy returns one', () => {
    const blogs: any[] = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
  describe('Item Api tests verifies that', () => {
    test('the correct amount of Item posts in the JSON format', async () => {
        const newItem = {
            itemName: 'Something',
            price: 100,
            quantity: 10
        };
        const res = await api
        .post('/api/item/createItem')
        .send(newItem)
        expect(res.status).toEqual(200)
        expect(res._body.data.items).toHaveProperty('itemName', 'Something');
        expect(res._body.data.items).toHaveProperty('price',100);
        expect(res._body.data.items).toHaveProperty('quantity',10);

       
    })

    test('should return 400 if name is missing', async () => {
        const newItem = {
            price: 100,
            quantity: 10
        };
        const res = await api
        .post('/api/item/createItem')
        .send(newItem);
        expect(res.status).toBe(400);
      });
    
    test('should return a list of items', async () => {
        const res = await api
        .get('/api/item/getItems')
        expect(res.status).toBe(200);
        expect(Array.isArray(res._body.data.items)).toBe(true);
        expect(res._body.data.items.length).toBeGreaterThan(0);
    })

    test('should return an empty list if no items exist', async () => {
        // Assuming there are no items in the database
        const mockItems : any = [];
        jest.spyOn(ItemController, 'getItems').mockResolvedValue({ status: 200,message:'Empty Item', data: mockItems });
        
        // await api.get('/getItems', mockRequest, mockResponse);

        const res = await api.get('/api/item/getItems');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res._body.data)).toBe(true);
        expect(res._body.data.length).toBe(0);
      });
    test('should return status 200 and the deleted item', async () => {
        const newItem = {
            itemName: 'Something',
            price: 100,
            quantity: 10
        };
        const item = await api
        .post('/api/item/createItem')
        .send(newItem)
        const res = await api.delete(`/api/item/deleteItem/${item._body.data.items._id}`);
        expect(res.statusCode).toBe(200);

    })
    test('should return status 404 if the item is not found', async () => {
        // Send a DELETE request with an invalid item ID
        let id = new Types.ObjectId("64394bc6e8788dcad74abe7a")
        const res = await api.delete(`/api/item/deleteItem/${id}`);
        // console.debug(res)
        // Verify that the response has status 404
        expect(res.status).toEqual(404);
      });
    

  })