package demo

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.json.Json.toJson



object Application extends Controller {

  def index = Action {
    Logger.debug("Starting the app")

    Ok(views.html.index("Your new application is ready."))
  }

  def login = Action(parse.json) { request =>

    Logger.debug("Login action")

    implicit val loginRequest: Reads[LoginRequest] = Json.reads[LoginRequest]

    request.body.validate[LoginRequest] match {
      case s: JsSuccess[LoginRequest] if (s.get.authenticate) => {
        Ok(toJson(Map("valid" -> true))).withSession("user" -> s.get.username)
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

  case class LoginRequest(username: String, password: String) {
    Logger.debug(s"auth : $username , $password ")
    val validUsers = Map("sysadmin" -> "password1", "root" -> "me")

    def authenticate = validUsers.exists( _ == (username, password))
  }

}
