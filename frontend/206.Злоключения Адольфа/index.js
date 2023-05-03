const express = require("express");
const { BEEP_CODES } = require("@yandex-blitz/phone");

const writeQueue = [];
let isWriteInProgress = false;

const processQueue = () => {
  if (isWriteInProgress) {
    return;
  }

  if (writeQueue.length > 0) {
    isWriteInProgress = true;

    const fn = writeQueue.shift();

    fn().then(() => {
      isWriteInProgress = false;
      processQueue();
    });
  }
};

const makeWriteJob = (phone, req, res) => {
  return () => {
    return phone
      .getData()
      .then((value) => {
        const speeddialDict = JSON.parse(value);

        speeddialDict[req.params.digit] = Number(req.params.phonenumber);

        return phone
          .setData(JSON.stringify(speeddialDict))
          .then(() => phone.beep(BEEP_CODES.SUCCESS))
          .then(() => {
            res.sendStatus(200);
          });
      })
      .catch((e) => {
        phone.beep(BEEP_CODES.ERROR).then(() => {
          res.sendStatus(500);
        });
      });
  };
};

const createApp = ({ phone }) => {
  const app = express();

  // звонит по номеру, записанному в «быстром наборе» под цифрой digit
  app.get("/speeddial/:digit", (req, res) => {
    phone
      .getData()
      .then((value) => {
        const speeddialDict = JSON.parse(value);

        return phone.connect().then(
          async () => {
            await phone.dial(speeddialDict[req.params.digit]);

            res.sendStatus(200);
          },
          async () => {
            await phone.beep(BEEP_CODES.FATAL);

            res.sendStatus(500);
          }
        );
      })
      .catch(async (e) => {
        await phone.beep(BEEP_CODES.ERROR);

        res.sendStatus(500);
      });
  });

  // записывает в «быстрый набор» под цифру digit номер phonenumber
  app.post("/speeddial/:digit/:phonenumber", (req, res) => {
    writeQueue.push(makeWriteJob(phone, req, res));
    processQueue();
  });

  return app;
};

exports.createApp = createApp;
