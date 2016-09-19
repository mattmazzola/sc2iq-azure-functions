import * as azure from "azure-storage";
import * as fs from 'fs';
import * as path from 'path';
import * as cbd from 'sc2-convertbalancedata';
import { IContext } from '@mattmazzola/azure-functions-typescript';
import * as moment from 'moment';

const storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
const storageAccountUrl = process.env.AZURE_STORAGE_ACCOUNT_URL;
const storageAccessKey = process.env.AZURE_STORAGE_ACCESS_KEY;
const tempDirectory = process.env["TMP"];
const tempFileName = "xmlZip.zip";
const fileDestination = path.join(tempDirectory, tempFileName);
const extractFolderName = "extract";
const extractPath = path.join(tempDirectory, extractFolderName);

const anonymousBlobService: azure.BlobService = azure.createBlobServiceAnonymous(storageAccountUrl);
const secureBlobService = azure.createBlobService(storageAccount, storageAccessKey);

export function xml2json(context: IContext, xmlZipBlob: any) {
    context.log('Node.js blob trigger function processed blob:', xmlZipBlob);
    context.log(`typeof xmlZipBlob:`, typeof xmlZipBlob);

    context.log('Writing blob file to: ', fileDestination);
    cbd.util.writeFileAsync(fileDestination, xmlZipBlob)
        .then(() => {
            return cbd.zipToXml(fileDestination, extractPath);
        })
        .then(unitsXml => {
            const now = moment();
            const outputBlobName = `${now.format("YYYY-MM-DD-hh-mm-ss")}.xml`;
            return cbd.util.saveBlob(secureBlobService, "balancedataxml", outputBlobName, unitsXml)
            .then(() => unitsXml);
        })
        .then(unitsXml => {
            return cbd.xmlToJson(unitsXml);
        })
        .then(groupedUnits => {
            const blobString = JSON.stringify(groupedUnits);
            const now = moment();
            const outputBlobName = `${now.format("YYYY-MM-DD-hh-mm-ss")}.json`;

            return Promise.all([
                cbd.util.writeFileAsync(path.join(tempDirectory, outputBlobName), blobString),
                cbd.util.saveBlob(secureBlobService, "balanceddatajson", outputBlobName, blobString)
            ]);
        })
        .then(() => {
            context.done();
        })
        .catch(error => {
            context.done(error);
        });
};