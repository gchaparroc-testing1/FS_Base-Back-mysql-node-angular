import { Request, Response } from 'express';
import { Client } from '../models/client';

export const getClients = async (req: Request, res: Response) => {
    const listClients = await Client.findAll({
        attributes: ['id', 'name', 'alias_name']
    });

    res.json(listClients)
}