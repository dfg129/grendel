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
      Logger.debug("where is my nonce")
      Ok(views.html.main.summary())
    }.getOrElse {
      Logger.debug("or else")
     Redirect(routes.Login.authenticate())
    }
  }

  def summary = Action { implicit request =>
    Logger.debug("summary")
    Ok(views.html.main.summary())
  }

  def instances = Action.async { implicit request =>
    Logger.debug("instances")

    val instanceResult: Future[Seq[Instance]] = InstanceDAO.findAll(1, 10)
    val timeout = play.api.libs.concurrent.Promise.timeout("Please contact admin", 10.second)

    Future.firstCompletedOf(Seq(instanceResult, timeout)).map {
      case instances: Seq[Instance] => {
        Logger.debug(Json.prettyPrint(Json.toJson(instances)))
        Ok(toJson(
            instances.map { i =>
                Map("name" -> i.name, "id" -> i.id)
            }
          ))
      }
      case timeout: String => InternalServerError(timeout)
    }
  }
}
