package demo.controllers

import demo.models._
import demo.services._
import scala.concurrent.{Future}
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.json.Json.toJson
import play.api.libs.concurrent.Execution.Implicits._



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
        val username = loginRequest.get.user.map(_.userName)
        val password = loginRequest.get.user.map(_.password)
        Logger.debug("past the first check " + username)
        if(username == loginRequest.get.username && password == loginRequest.get.password) {
            Ok(toJson(Map("valid" -> true))).withSession("user" -> username.get)
        }
        else {
          Forbidden("Invalid Login")
      }
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
    val user = getUser(username)
  }

  def getUser(username: String): Option[User] = {
    Logger.debug("getUser : " + username)
    val userResult = UserDAO.findOneByName(username)
    Logger.debug(userResult.value.flatMap(_.toOption).toString)

    for {
      opt <- userResult.value.flatMap(_.toOption)
      user <- opt
    } yield user
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
