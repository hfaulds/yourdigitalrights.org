import { useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {FormattedDate} from 'react-intl'
import Regulations from "../../utils/regulations";

const Timeline = ({  classes, intl, requestItem, days, selectedCompany, status }) => {
  const [showRequestEmail, setShowRequestEmail] = useState(false);
  const [showReminderEmail, showReminderEmailEmail] = useState(false);
  const [showEscalationEmail, showEscalationEmailEmail] = useState(false);
  const regulationType = Regulations[requestItem.regulationType.S].longName;

  return (
    <div className={classes.root} id="requestDetails">
      <div className={classes.container}>
        <h2 className={classes.header}>
          <FormattedMessage id="request.details.header" defaultMessage="Request details" />
        </h2>
        <Paper
          component="div"
          className={classes.details}
          elevation={10}
        >
          {requestItem.requestEmailTo && (
            <dl className={classes.detailsList}>
              <dt><FormattedMessage id="request.details.type" defaultMessage="Request type:" /></dt>
              <dd>{ requestItem.requestType.S }</dd>
              <dt><FormattedMessage id="request.details.regulation" defaultMessage="Regulation:" /></dt>
              <dd>{ regulationType }</dd>
              <dt><FormattedMessage id="request.details.name" defaultMessage="Requested by:" /></dt>
              <dd>{ requestItem.name.S }</dd>
              <dt><FormattedMessage id="request.details.organization" defaultMessage="Recipient:" /></dt>
              <dd>{ requestItem.companyName.S }</dd>
              <dt><FormattedMessage id="request.details.date" defaultMessage="Request email date:" /></dt>
              <dd><FormattedDate value={requestItem.requestEmailSentAt.S} /></dd>
              <dt><FormattedMessage id="request.details.sentTo" defaultMessage="Recipient email address:" /></dt>
              <dd>{ requestItem.requestEmailTo.S }</dd>
              {requestItem.reminderEmailSentAt && (
                <>
                  <dt><FormattedMessage id="request.details.reminderDate" defaultMessage="Reminder email date:" /></dt>
                  <dd><FormattedDate value={requestItem.reminderEmailSentAt.S} /></dd>
                </>
              )}
              {requestItem.escalationEmailSentAt && (
                <>
                  <dt><FormattedMessage id="request.details.escalationDate" defaultMessage="Escalation email date:" /></dt>
                  <dd><FormattedDate value={requestItem.escalationEmailSentAt.S} /></dd>
                </>
              )}
              <dt id="requestEmail">
                <a className={classes.showEmail} onClick={() => setShowRequestEmail(!showRequestEmail)}>
                  {showRequestEmail && (
                    <FormattedMessage id="request.details.hide.request" defaultMessage="Hide request email" />
                  )}
                  {!showRequestEmail && (
                    <FormattedMessage id="request.details.show.request" defaultMessage="View request email" />
                  )}
                </a>
              </dt>
              <dd className={showRequestEmail ? classes.showFullEmail : classes.hideFullEmail}>
                <h3>{ requestItem.requestEmailSubject.S }</h3>
                <p dangerouslySetInnerHTML={
                  ({__html: requestItem.requestEmailContent.S.replace(/\n/g, '<br>')})
                } />
              </dd>
              {requestItem.reminderEmailSentAt && (
                <>
                  <dt id="reminderEmail">
                    <a className={classes.showEmail} onClick={() => showReminderEmailEmail(!showReminderEmail)}>
                      {showReminderEmail && (
                        <FormattedMessage id="request.details.hide.reminder" defaultMessage="Hide reminder email" />
                      )}
                      {!showReminderEmail && (
                        <FormattedMessage id="request.details.show.reminder" defaultMessage="View reminder email" />
                      )}
                    </a>
                  </dt>
                  <dd className={showReminderEmail ? classes.showFullEmail : classes.hideFullEmail}>
                    <h3>{ requestItem.reminderEmailSubject.S }</h3>
                    <p dangerouslySetInnerHTML={
                      ({__html: requestItem.reminderEmailContent.S.replace(/\n/g, '<br>')})
                    } />
                  </dd>
                </>
              )}
              {requestItem.escalationEmailSentAt && (
                <>
                  <dt id="escalationEmail">
                    <a className={classes.showEmail} onClick={() => showEscalationEmailEmail(!showEscalationEmail)}>
                      {showEscalationEmail && (
                        <FormattedMessage id="request.details.hide.escalation" defaultMessage="Hide escalation email" />
                      )}
                      {!showEscalationEmail && (
                        <FormattedMessage id="request.details.show.escalation" defaultMessage="View escalation email" />
                      )}
                    </a>
                  </dt>
                  <dd className={showEscalationEmail ? classes.showFullEmail : classes.hideFullEmail}>
                    <h3>{ requestItem.escalationEmailSubject.S }</h3>
                    <p dangerouslySetInnerHTML={
                      ({__html: requestItem.escalationEmailContent.S.replace(/\n/g, '<br>')})
                    } />
                  </dd>
                </>
              )}                
            </dl>
          )}
          {!requestItem.requestEmailTo && (
            <FormattedMessage id="request.details.nowDetails" defaultMessage="Request details are not avaialble at this time, please refresh the page once you have sent the email." />
          )}
        </Paper>
      </div>
    </div>
  );
}
export default withStyles(styles)(Timeline);
