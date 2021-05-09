import {  Request, Response } from 'express';
const {MongoClient} = require('mongodb');
const speech = require('@google-cloud/speech');
var fs = require('fs');

import uploads from '../upload';

import Song from '../models/Song'

const uri = "mongodb+srv://root:5txsNqF5sge0IEo2@gradi.bq9dd.mongodb.net/retryWrites=true&w=majority";

const speecher = new speech.SpeechClient({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    projectId: 'speech-313116'
});

export default {
    async create(request: Request, response: Response) {
        try {
            const client = new MongoClient(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            await client.connect();

            const collection = await client.db("gradi").collection("songs");

            const requestSong = request.files as Express.Multer.File[];

            const song = requestSong.map(song => {return {path: song.filename}})

        
            const songDir = song[0].path;
            const songName = 'C:/Users/Candin/Documents/UFV/2021-1/CCF 424/tp3/gradi-tp3/gradi-tp3-server/src/uploads/' + songDir;

            const audio = {
                content: fs.readFileSync(songName).toString('base64')
              };
              const config = {
                encoding: 'LINEAR16',
                sampleRateHertz: 16000,
                languageCode: 'pt-BR',
              };
              
              const req = {
                audio: audio,
                config: config,
              };
            
              // Detects speech in the audio file
              const [res] = await speecher.recognize(req);
              const transcription = res.results
                .map((result: any) => result.alternatives[0].transcript)
                .join('\n');

            const payload = {
                title: request.body.title,
                artist: request.body.artist,
                length: request.body.length,
                categories: request.body.categories,
                file: songName,
                lyrics: transcription
            }

           collection.insertOne(payload, function(err: any, res: Response) {
                if (err) throw err;
                client.close();
                return response.status(201).json("Song inserted");
              }); 

        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async index(request: Request, response: Response) {
        try {
            const client = new MongoClient(uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            await client.connect();

            const collection = await client.db("gradi").collection("songs");

            const query = await collection.findOne({name: 'teste'});

            console.log(query);
            return response.status(200).json(query);

        } catch (error) {
            return response.status(400).json(error);
        }
    }
}
