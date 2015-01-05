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


object Login extends Controller {

  def authenticate = Action { implicit request =>
    Logger.debug("authe ???")
    Ok(views.html.login.authentication())
  }

  def login = Action.async(parse.json) { implicit request =>
    implicit val loginRequest: Reads[LoginRequest] = Json.reads[LoginRequest]

    request.body.validate[LoginRequest] match {
      case loginRequest: JsSuccess[LoginRequest] => {
        val userResult: Future[Option[User]] = getUser(loginRequest.get.username)
        val timeout = play.api.libs.concurrent.Promise.timeout("wait no more", 10.second)

        Future.firstCompletedOf(Seq(userResult, timeout)).map {
          case user: Option[User] => {
            if(user.exists(_.password == loginRequest.get.password)) {
              Logger.debug("in")
              Ok(toJson(Map("valid" -> true))).withSession("user" -> user.map(_.userName).getOrElse(""))
            }
            else {
              Forbidden("Invalid Login")
            }
          }
          case timeout: String => InternalServerError(timeout)
        }
      }
      case JsError(_) => {
        val futureRes = scala.concurrent.Future{}
        futureRes.map(_ => Ok(toJson(Map("valid" -> false))))
      }
    }
  }

  case class LoginRequest(username: String, password: String)

  def getUser(username: String): Future[Option[User]] = {
    UserDAO.findOneByName(username)
  }

}
