var mongoose = require('mongoose'),
Notification = mongoose.model('Notification');

class NotificationCtrl {
  addNewNotification(notification, onSuccess, onError){
    Notification.create(notification, function (err, obj) {
      if (err)  return onError(err);
      return onSuccess(obj);
    });
  }

  onAddNewNotification(req, res) {
    this.addNewNotification(req.body, res.send, res.send);
  }

  // addNewNotification({url, notification, eid}) {
  //   const body = {
  //     actionurl: url,
  //     notification: notification,
  //     personid: eid,
  //     datetime: new Date(),
  //     status: false
  //   };

  //   Notification.create(body, function (err, obj) {
  //     if (err) {
  //       console.log(err);
  //       return res.send(err);
  //     }
  //     return res.send(obj);
  //   });
  // }

  // addNewNotification(req, res) {

  //   Notification.create(req.body, function (err, obj) {
  //     if (err) {
  //       console.log(err);
  //       return res.send(err);
  //     }
  //     return res.send(obj);
  //   });
  // }

  getNotificationByPerson(req, res) {
    const eid = req.query.eid;
    Notification.find({'personid': eid}, function(err, result) {
      return res.send(result);
    });
  }

}

module.exports = new NotificationCtrl();
