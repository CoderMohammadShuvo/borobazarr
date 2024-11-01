import axios from 'axios';

type SMSType = {
  message: string;
  numbers: string;
};

export default async function sendSms({ message, numbers }: SMSType) {
  let url =
    'http://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=RASATECH&userName=rasatechbd&password=d5947f188ac55bd7252537105e76b3e6&MsgType=TEXT';
  url += `&receiver=${numbers}`;
  url += `&message=${message}`;

  //  (url)

  try {
    await axios.get(url).then((res) => {
      return res.data;
    });
  } catch (err) {
    err;
  }
}
