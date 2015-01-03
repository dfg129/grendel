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


object Application extends Controller {

  def index = Action { implicit request =>
    request.session.get("user").map { user =>
      Logger.debug("user = " + user)
      Redirect(routes.Application.main())
    }.getOrElse {
      Logger.debug("or else")
      Redirect(routes.Application.authenticate())
    }
  }

  def authenticate = Action { implicit request =>
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
              Ok(toJson(Map("valid" -> true)))
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

  def main = Action { implicit request =>
      request.session.get("user").map { user =>
          Ok(views.html.main.summary())
      }.getOrElse {
          Unauthorized("Access denied")
      }
  }

  case class LoginRequest(username: String, password: String)

  def getUser(username: String): Future[Option[User]] = {
      UserDAO.findOneByName(username)
  }

  def getUsers(page: Int, perPage: Int) = Action.async { implicit request =>
    for {
      count <- UserDAO.count
      users <- UserDAO.findAll(1, 10)
    } yield {
       Ok(Json.toJson(users))
    }
  }
}
