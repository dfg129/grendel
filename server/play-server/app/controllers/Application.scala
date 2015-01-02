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


object Application extends Controller {

  def index = Action {
    Logger.debug("Starting the app")

    Ok(views.html.index("Your new application is ready."))
  }

  def login = Action(parse.json) { implicit request =>

    Logger.debug("Login action")

    implicit val loginRequest: Reads[LoginRequest] = Json.reads[LoginRequest]

    request.body.validate[LoginRequest] match {
      case loginRequest: JsSuccess[LoginRequest] => {
        val userResult: Future[Option[User]] = getUser(loginRequest.get.username)
        userResult.onComplete {
          case Success(user) => {
            Logger.debug("Found user :")
            if(user.get.userName == loginRequest.get.username && user.get.password == loginRequest.get.password) {
             Logger.debug("Success !")
              Ok(toJson(Map("valid" -> true))).withSession("user" -> user.get.userName)
            }
            else {
              Logger.debug("invalid")
              Forbidden("Invalid Login")
            }
          }
          case Failure(ex) => {
            Logger.debug("ex failure " + ex.getMessage)
            Ok(toJson(Map("valid" -> false)))
          }
        }
Logger.debug("failure")
        Ok(toJson(Map("valid" -> false)))

      }
      case _ => Ok(toJson(Map("valid" -> false)))
    }
  }


  def welcome = Action { implicit request =>
      request.session.get("user").map (
        user => {
          Ok(views.html.overview(user))
        }
      ).getOrElse(Redirect(routes.Application.index()))
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
