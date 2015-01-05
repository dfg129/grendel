angular.module('app')
  .service('Session', function() {
    session = {};

    session.create = function(sessionId, userId, userName) {
      this.id = sessionId;
      this.userId = userId;
      this.userName = userName;
    };

    session.destroy = function() {
      this.id = null;
      this.userId = null;
      this.userName = null;
    };

    return session;
  });
