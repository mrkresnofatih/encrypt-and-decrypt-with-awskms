import { KMS } from '@aws-sdk/client-kms';
import {Buffer} from 'buffer'

const kms = new KMS({
    credentials: {
        accessKeyId: "someAccessKeyId",
        secretAccessKey: "someSecretAccessKey",
    },
    region: "someRegion"
})

const encrypt = (message: string) => kms.encrypt({
    KeyId: "someKmsKeyId",
    Plaintext: Buffer.from(message),
}, (e, data) => {
    if (e) {
        console.log("error: " + e);
    } else {
        const d = data?.CiphertextBlob;
        console.log("cipher: " + d);

        if (d) {
            decrypt(d);
        }
    }
})

encrypt("my super secret message");

const decrypt = (cipher: Uint8Array) => kms.decrypt({
    CiphertextBlob: cipher
}, (e, data) => {
    if (e) {
        console.log("error: " + e);
    } else {
        const plaintext = data?.Plaintext;
        const message = new TextDecoder().decode(plaintext)

        console.log("decryptedmessage: " + message);
    }
})