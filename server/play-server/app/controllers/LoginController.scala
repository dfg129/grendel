package demo.controllers

import demo.models._
import demo.services._
import scala.concurrent.{Future}
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.json.Json.toJson
import play.api.libs.concurrent.Execution.Implicits._
import scala.util.{Success, Failure}
import play.api.libs.iteratee.Enumerator
import scala.concurrent.duration._

/**
 * Login handles request by the client to show an authentication page and a
 * REST post wich contains username and password. It checks with the UserDAO
 * service to determine is this is a valid user
 */
object Login extends Controller {

  // user identifier on key/value pair in session
  val userIdentifier = Play.current.configuration.getString("session.user").getOrElse("user")

  /**
   * Return a page with the login/password input items
   */
  def authenticate = Action { implicit request =>
    Ok(views.html.login.authentication())
  }

  /**
   * Handle the REST post for login. Success returns 202 and sets session data.
   * Failure return 403 warning. Request to login checks for timeout when accessing
   * and generates error message if database is unreachable.
   */
  def login = Action.async(parse.json) { implicit request =>
    implicit val loginRequest: Reads[LoginRequest] = Json.reads[LoginRequest]

    request.body.validate[LoginRequest] match {
      // Find a login request
      case loginRequest: JsSuccess[LoginRequest] => {
        // pull the user name from the body of the request
        val userResult: Future[Option[User]] = getUser(loginRequest.get.username)
        // generate failure message if database is unreachable within a 10 second duration
        val timeout = play.api.libs.concurrent.Promise.timeout("Please contact admin", 10.second)

        Future.firstCompletedOf(Seq(userResult, timeout)).map {
          // found the user
          case user: Option[User] => {
            // compare password in post with password on record
            if(user.exists(_.password == loginRequest.get.password)) {
              // set the session parameter 'user' and return 202
              // TODO - for better security generate nonce values and by pass cookie handling
              Ok(toJson(Map("valid" -> true))).withSession(userIdentifier -> user.map(_.userName).getOrElse(""))
            }
            else {
              // Return http 403
              // Could also log failed attempts here
              // Logger.warn(request->user attempted to log in)
              Forbidden("Invalid Login")
            }
          }
          // Return http 500
          case timeout: String => InternalServerError(timeout)
        }
      }
      case JsError(_) => {
        // ignore any non valid reuqests
        // TODO - handle other possible error issues here
        val futureRes = scala.concurrent.Future{}
        futureRes.map(_ => Ok(toJson(Map("valid" -> false))))
      }
    }
  }

  // class used to compare incoming request when looking for Login type
  case class LoginRequest(username: String, password: String)

  /**
   * Requests a demo.models.User from the UserDAO service, search by name
   * @param name of requested user
   */
  def getUser(username: String): Future[Option[User]] = {
    UserDAO.findOneByName(username)
  }

}
