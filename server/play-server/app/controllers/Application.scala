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
      Ok(views.html.main.summary())
    }.getOrElse {
     Redirect(routes.Login.authenticate())
    }
  }

  def summary = Action { implicit request =>
    request.session.get("user").map { user =>
      Ok(views.html.main.summary())
    }.getOrElse {
      Redirect(routes.Login.authenticate())
    }
  }

  def instances(page: Int, size: Int) = Action.async { implicit request =>
    Logger.debug(s"instances : $page : $size")

    val instanceResult: Future[Seq[Instance]] = InstanceDAO.findAll(page, size)

      // this is an opportunity to abstract mapping from the data storage,
      // if not needed then you would handle mapping implicitly in the service to support a nosql document store
     instanceResult.map (
       instances =>  {
          Ok(toJson(
            instances.map { instance =>
                Map("name" -> instance.name,
                    "id" -> instance.id,
                    "itype" -> instance.itype,
                    "state" -> instance.state,
                    "az" -> instance.az,
                    "publicIP" -> instance.publicIP,
                    "privateIP" -> instance.privateIP
                    )
            })
          )
      })
  }

  def count = Action.async { implicit request => {
      val totalResult: Future[Int] = InstanceDAO.count
      totalResult.map (
        count => {
            Ok(toJson(Map("total" -> count)))
          }
      )
    }
  }
}
