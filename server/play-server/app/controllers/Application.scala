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
 * This the main application for the demo requesting stored instance data
 * from a mongodb. The interface to the mongo database is done through 
 * ReactiveMongo which is a non-blocking driver. All requests are returned
 * immediately as Future types and processed when they are available.
 */
object Application extends Controller {

   // user identifier on key/value pair in session
   val userIdentifier = Play.current.configuration.getString("session.user").getOrElse("user")

  /**
   * Handle the first page requests, if logged in then show summary page
   * else redirect to the login page.
   */
  def index = Action { implicit request =>
    request.session.get(userIdentifier).map { user =>
      Ok(views.html.main.summary())
    }.getOrElse {
     Redirect(routes.Login.authenticate())
    }
  }

  /**
   * Show the summary page if user is permitted otherwise redirect to login
   */
  def summary = Action { implicit request =>
    request.session.get(userIdentifier).map { user =>
      Ok(views.html.main.summary())
    }.getOrElse {
      Redirect(routes.Login.authenticate())
    }
  }

  /**
   * Return a group of machine instances indexed at page with a requested group size
   * allowing paging on the client.
   * @param page start index
   * @param size size of group returned
   */
  def instances(page: Int, size: Int) = Action.async { implicit request =>
    Logger.debug(s"instances reuqested: $page : $size")

    // call this service to access the underlying data store
    val instanceResult: Future[Seq[Instance]] = InstanceDAO.findAll(page, size)

      // this is an opportunity to provide abstract mapping from the data storage,
      // if not needed then you would handle mapping implicitly in the service to support a nosql document
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

  /**
   * Return a total count of all instances stored
   */
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
