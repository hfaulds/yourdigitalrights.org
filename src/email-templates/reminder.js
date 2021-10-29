import capitalize from "../utils/capitalize";
import dateFormatter from "../utils/date-formatter";
import daysSince from "../utils/days-since";
import Regulations from "../utils/regulations";

export default {
  subject(requestItem) {
    const regulation = Regulations[requestItem.regulationType.S];
    const requestType = regulation['requestTypes'][requestItem.requestType.S];
    return `Reminder: My ${requestItem.regulationType.S} Data ${capitalize(requestType.name)} Request sent ${dateFormatter(new Date(requestItem.requestCreatedAt.S))}`;
  },
  body(requestItem, status) {
    const regulation = Regulations[requestItem.regulationType.S];
    const requestType = regulation['requestTypes'][requestItem.requestType.S];
    const bodyParts = [];

    bodyParts.push('To whom it may concern:');
    bodyParts.push(`On ${new Intl.DateTimeFormat('en', { dateStyle: 'full'}).format(new Date(requestItem.requestCreatedAt.S))} I have sent you a Data ${capitalize(requestType.name)} Request via email, pursuant to article ${requestType.article} of the ${regulation.longName} (${regulation.displayName}).`);

    if (status === 'PARTIAL') {
      bodyParts.push('So far you have failed to fully comply with my request.');
    } else if (status === 'DECLINED') {
      bodyParts.push('So far you have refused to comply with my request.');
    } else if (status === 'NO_REPLY') {
      bodyParts.push('So far I did not receive a reply to my request.');
    }

    const daysSinceRequest = daysSince(new Date(requestItem.requestCreatedAt.S));
    if (daysSinceRequest > requestType.timeLimit) {
      bodyParts.push(`Since it has been ${daysSinceRequest} since the request was sent you are now in violation of section ${requestType.article} of the ${regulation.displayName}.`);
    }
    bodyParts.push(`I am sending this email to remind you of my request, and reserve the right to escalate the matter to the ${regulation.dpa.longName} if you do not fully comply with it.`);
   
   
    /* bodyParts.push(`The original request was emailed from my personal email address. The text of the email was generated by YourDigitalRights.org, a website which automates the process of filing requestItem requests. The service has kindly kept a record of my request which you can view here.`); */
    

    bodyParts.push('Kind regards,');
    bodyParts.push(requestItem.name.S);

    return bodyParts.join('\n\n');
  },
};
