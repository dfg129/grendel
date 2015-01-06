package demo.services

import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.Play.current
import scala.concurrent.{Future}
import play.api.libs.json.Json
import reactivemongo.api._
import reactivemongo.core.commands._
import play.api._
import demo.models._
import scala.util.{Success, Failure}
import reactivemongo.bson._
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.iteratee._

/**
 * Service to retrieve a demo.models.User from the database
 */
object UserDAO {
  import scala.concurrent.ExecutionContext.Implicits.global

  val driver = new MongoDriver

  // pull config info from application.conf
  // host and port
  val connection = driver.connection(List(Play.current.configuration.getString("db.driver").getOrElse("Could not retrieve db")))
  // database
  val db = connection(Play.current.configuration.getString("db.auth").getOrElse("auth not found"))
  // collection
  val collection = db.collection[JSONCollection](Play.current.configuration.getString("db.users").getOrElse("users not found"))

  /**
   * Find a user by name
   * @param name of the user
   */
  def findOneByName(username: String): Future[Option[User]]  = {
    val query = Json.obj("userName" -> username)
    val filter = Json.obj("userId" -> 1, "userName" -> 1, "password" -> 1)
    collection.find(query, filter).one[User]
  }
}
